const express = require("express");
const mysql = require("../mysql");
const roleFn = require("../utils/roleFn");
const globalFn = require("../utils/globalFn");
const taskFn = require("../utils/taskFn");
const { roleAttr } = require("../table/attribute");
const Global = require("../global");
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
  const roleInfo = await roleFn.getRoleInfo(req, role_id);
  if (roleInfo) {
    const { base_pool, buff_pool, addition_pool, address, ...info } = roleInfo;
    // 计算角色属性
    const data = roleFn.computeRoleAttr(req, res, roleInfo, role_id);
    if (!data) {
      return;
    }
    res.send({
      code: 0,
      data: {
        role_id: roleInfo['role_id'],
        attr: data.attr,
        buff: data.buff,
        life: roleInfo['life'] > data.attr.life_max ? data.attr.life_max : roleInfo['life'],
        mana: roleInfo['mana'] > data.attr.mana_max ? data.attr.mana_max : roleInfo['mana'],
        role_name: roleInfo['role_name'],
        role_level: roleInfo['role_level'],
        role_exp: roleInfo['role_exp'],
        role_evil: roleInfo['role_evil'],
        role_signature: roleInfo['role_signature'],
        role_career: CAREER_TYPE[roleInfo['role_career']],
        role_race: RACE_TYPE[roleInfo['role_race']],
        role_realm: realm[roleInfo['role_realm']] ? realm[roleInfo['role_realm']].name : '',
        role_sex: roleInfo['role_sex'],
        role_title: title[roleInfo['role_title']] ? title[roleInfo['role_title']].name : '',
        reputation_pool: roleInfo['reputation_pool'],
        socialize_pool: roleInfo['socialize_pool'],
        equip_pool: roleInfo['equip_pool']
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
        code: 100004,
        message: '角色名重复'
      })
      return;
    }
    // 查询账号下角色数量
    mysql.sqlQuery(`select * from role  where user_id="${user}"`, results => {
      if (results.length < 3) {
        const role_id = `${user}_${results.length + 1}`;

        let attr = roleAttr['atk'];
        if (role_career % 3 === 2) {
          attr = roleAttr['def']
        }
        if (role_career % 3 === 0) {
          attr = roleAttr['agile']
        }
        const { life, mana } = attr;
        const base_pool = {
          base: attr
        }
        const roleSql = "insert into role(user_id,role_id,role_name,role_race,role_career,role_sex,role_level,role_exp,role_realm,role_title,life,mana,address,role_evil,role_signature,equip_pool,socialize_pool,skill_pool,base_pool,addition_pool,buff_pool,reputation_pool,task_pool) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const roleData = [user, role_id, role_name, role_race, role_career, role_sex == 1 ? '男' : '女', 1, '0/200', 1, 0, life, mana, '10000,0,0', 0, '', '{}', '{}', '{}', JSON.stringify(base_pool), '{}', '{}', '{}', '{"main":[{"id":1,"in_x":0}]}'];
        mysql.sqlAdd(roleSql, roleData, () => {
          //  背包
          const knapsackSql = "insert into knapsack(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
          const knapsackData = [user, role_id, 0, 0, '[]'];
          mysql.sqlAdd(knapsackSql, knapsackData, () => { });
          //  仓库
          const warehouseSql = "insert into warehouse(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
          const warehouseData = [user, role_id, 0, 0, '[]'];
          mysql.sqlAdd(warehouseSql, warehouseData, () => { });
          //  宠物
          const petSql = "insert into pet(user_id,role_id,wear_pet,list_pet) values(?,?,?,?)";
          const petData = [user, role_id, '{}', '[]'];
          mysql.sqlAdd(petSql, petData, () => { });
          //  好友
          const friendsSql = "insert into friends(user_id,role_id,list,apply) values(?,?,?,?)";
          const friendsData = [user, role_id, '[]', '[]'];
          mysql.sqlAdd(friendsSql, friendsData, () => { });
          Global.roleLoop[user] = { id: role_id, time: new Date() * 1 };
          res.send({
            code: 0,
            message: '创建成功'
          })
        });
        return;
      }
      res.send({
        code: 100004,
        message: '账号角色已满'
      })

    });
  })

});


module.exports = router;