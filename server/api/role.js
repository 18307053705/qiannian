const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const roleFn = require("../utils/roleFn");
const globalFn = require("../utils/globalFn");
const taskFn = require("../utils/taskFn");
const { roleAttr, getInitAttr } = require("../table/attribute");
const { title } = require("../table/title");
const { realm } = require("../table/realm");
const { CAREER_TYPE, RACE_TYPE } = require("../meun");
const router = new express.Router();
// 角色列表 
router.post("/getRoleList", (req, res) => {
  const user = req.cookies["q_uid"];
  mysql.sqlQuery(`select * from role  where user_id="${user}"`, results => {
    res.send({
      code: 0,
      data: results
    });
  });
});

// 状态信息
router.post("/getRoleInfo", async (req, res) => {
  const { role_id } = req.body;
  const role = await roleFn.getRoleInfo(req, role_id);
  if (role) {
    // 计算角色属性
    const data = roleFn.computeRoleAttr(req, role, role_id);
    if (!data) {
      return;
    }
    res.send({
      code: 0,
      data: {

        role_id: role['role_id'],
        attr: data.attr,
        buff: data.buff,
        life: role['life'] > data.attr.life_max ? data.attr.life_max : role['life'],
        mana: role['mana'] > data.attr.mana_max ? data.attr.mana_max : role['mana'],
        role_name: role['role_name'],
        role_level: role['role_level'],
        role_exp: role['role_exp'],
        role_evil: role['role_evil'],
        role_signature: role['role_signature'],
        role_career: CAREER_TYPE[role['role_career']],
        role_race: RACE_TYPE[role['role_race']],
        role_realm: realm[role['role_realm']] ? realm[role['role_realm']].name : '',
        role_sex: role['role_sex'],
        role_title: title[role['role_title']] ? title[role['role_title']].name : '',
        reputation_pool: role['reputation_pool'],
        socialize_pool: role['socialize_pool'],
        equip_pool: role['equip_pool'],
        role_integral: role['role_integral'],
        pet_pool: role['pet_pool'],
        treasure_pool: role['treasure_pool'],
      }
    });
  }


});

// 选择角色
router.post("/roleLogin", async (req, res) => {
  const user = req.cookies["q_uid"];
  const { role_id } = req.body;
  const { results: role } = await mysql.asyncQuery(`select * from role  where user_id="${user}" and role_id="${role_id}"`);
  const { results: knapsack } = await mysql.asyncQuery(`select * from knapsack  where user_id="${user}" and role_id="${role_id}"`);
  if (!role[0] && !knapsack[0]) {
    res.send({
      code: 100006,
      data: '角色信息异常'
    });
    return;
  }
  // 退出同账号下的其他角色
  await globalFn.roleExit(req, res);
  // 保存角色信息,并且记录登录时间
  Global.setRoleGlobal(req, role[0]);
  Global.setknapsackGlobal(req, knapsack[0]);
  Global.setSocializeGlobal(req);
  Global.setPetGlobal(req);
  Global.initDailyGlobal(role_id);
  // 不存在任务池，即代表今天第一次登录,初始化任务池
  if (!Global.taskLoop[role_id]) {
    taskFn.initTask(req);
  }
  res.send({
    code: 0,
    data: '角色选择成功'
  });
});

// 创建角色
router.post("/createRole", (req, res) => {
  const user = req.cookies["q_uid"];
  const { role_name, role_sex, role_career, role_race } = req.body;
  mysql.sqlQuery(`select * from role  where role_name="${role_name}"`, (results) => {
    if (results[0]) {
      res.send({
        code: 0,
        message: '角色名重复'
      })
      return;
    }
    // 查询账号下角色数量
    mysql.sqlQuery(`select * from role  where user_id="${user}"`, async (results) => {
      if (results.length < 3) {
        const role_id = `${user}_${results.length + 1}`;
        let attr = roleAttr['atk'];
        if (role_career % 3 === 2) {
          attr = roleAttr['def']
        }
        if (role_career % 3 === 0) {
          attr = roleAttr['agile']
        }
        //  角色初始属性
        const sqlInfo = {
          user_id: user,
          role_id,
          role_name,
          role_race,
          role_career,
          role_sex: role_sex == 1 ? '男' : '女',
          role_level: 1,
          role_exp: '0/200',
          role_realm: 1,
          role_title: 0,
          life: attr.life,
          mana: attr.mana,
          role_attr: {
            base: attr,
            addition: getInitAttr(),
          },
          role_buff: {
            attr: [],
            vip: {}
          },
          address: '10000,0,0',
          role_evil: 0,
          role_signature: '',
          socialize_pool: {},
          equip_pool: {},
          skill_pool: {
            art: {},
            fight: [null, null, null, null, null, null]
          },

          task_pool: {
            main: [1]
          },
          can_task_pool: {
            main: []
          },
          role_integral: {

          },
          pet_pool: {
            c: {},
            l: [],
            x: 10
          },
          treasure_pool: {
            fw: { exp: 0, ext: '0_0_0_0_0_0_0', s: 0, g: 0 },
            xz: { exp: 0, s: 0 },
            hb: { exp: 0, s: 0 },
            lp: { exp: 0, s: 0 },
            jbp: 0
          }
        }
        const keys = [];
        const value = [];
        const insert = [];
        Object.keys(sqlInfo).forEach((key) => {
          keys.push(key);
          value.push(typeof sqlInfo[key] === 'object' ? JSON.stringify(sqlInfo[key]) : sqlInfo[key]);
          insert.push('?');
        })

        const roleSql = `insert into role(${keys.join(',')}) values(${insert.join(',')})`
        mysql.asyncAdd(roleSql, value);
        //  背包
        const knapsackSql = "insert into knapsack(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const knapsackData = [user, role_id, 1000, 0, '[]', '{}'];
        mysql.asyncAdd(knapsackSql, knapsackData);
        //  仓库
        const warehouseSql = "insert into warehouse(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const warehouseData = [user, role_id, 0, 0, '[]'];
        mysql.asyncAdd(warehouseSql, warehouseData);
        //  好友
        const friendsSql = "insert into friends(user_id,role_id,list,apply) values(?,?,?,?)";
        const friendsData = [user, role_id, '[]', '[]'];
        mysql.asyncAdd(friendsSql, friendsData);
        // 退出同账号下的其他角色
        await globalFn.roleExit(req, res);
        // 保存角色信息,并且记录登录时间
        Global.roleGlobal[user] = {
          ...sqlInfo,
          id: sqlInfo.role_id,
          time: new Date() * 1, // 角色操作时间，长时间没有操作，即自动下线
          updateKeys: [],
        };
        Global.setknapsackGlobal(req, { user_id: user, role_id, yuanbao: 1000, yuanbao: 0, data: '[]' });
        Global.setSocializeGlobal(req);
        // 初始化任务池
        taskFn.initTask(req);
        res.send({
          code: 0,
          data: '角色创建成功'
        })
        return;
      }
      res.send({
        code: 100004,
        message: '账号角色已满'
      })

    });
  })

});

// 角色退出
router.post("/exit", async (req, res) => {
  await globalFn.roleExit(req, res);
  res.send({
    code: 0,
    data: '角色选择成功'
  });
});
module.exports = router;