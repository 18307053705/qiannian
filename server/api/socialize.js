const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const roleFn = require("../utils/roleFn");
const knapsackFn = require("../utils/knapsackFn");
const router = new express.Router();

const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}

const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}



// 创建势力
router.post("/create", async (req, res) => {
    const { type, name, text } = req.body;
    if (!type || !name) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { results } = await mysql.asyncQuery(`select * from socialize  where name="${name}" and type=${type} `);
    if (results[0]) {
        res.send({
            code: 0,
            message: `已经存在该${TYPE_MEUN[type]}`
        })
        return;
    }
    const { tael } = await knapsackFn.getKnapsackInfo(req, 1);
    if (tael < 1000000) {
        res.send({
            code: 0,
            message: '银两不足'
        })
        return;
    }
   

    const role = await roleFn.getRoleInfo(req, res);
    const compose = [{ id: role.role_id, name: role_name, level: 1 }]
    const petSql = "insert into socialize(name,level,compose,text,type) values(?,?,?,?,?)";
    const petData = [name, 1, JSON.stringify(compose), text || '', type];
    await mysql.asyncAdd(petSql, petData);
    await knapsackFn.updateKnapsack(req, {
        tael: tael - 1000000
    });
    res.send({
        code: 0,
        data: '创建成功'
    })
});

// 获取势力列表
router.post("/list", async (req, res) => {
    const { type } = req.body;
    const { results } = await mysql.asyncQuery(`select * from socialize  where type="${type}"`);
    res.send({
        code: 0,
        data: results
    })
});

// 获取势力详情
router.post("/detail", async (req, res) => {
    let { type } = req.body;
    if (!type) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const role = await roleFn.getRoleInfo(req, res);
    const socialize = JSON.parse(role.socialize_pool);
    const itme = socialize[TYPE_MEUN_NAME[type]];
    if(!itme){
        res.send({
            code: 0,
            data: ''
        })
        return;  
    }
    const id = socialize[TYPE_MEUN_NAME[type]].id
    const { results } = await mysql.asyncQuery(`select * from socialize  where id="${id}"`);
    res.send({
        code: 0,
        data: results
    })
});

// 加入势力
router.post("/apply", async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { id: role_id, name } = Global.roleLoop[user];
    const { results } = await mysql.asyncQuery(`select * from socialize  where id="${id}"`);
    const compose = JSON.parse(results['compose']);
    const apply = JSON.parse(results['apply']);
    const role_c = compose.find(({ id }) => id === role_id);
    const role_a = apply.find(({ id }) => id === role_id);
    if (role_c || role_a) {
        res.send({
            code: 100004,
            message: '重复申请帮会'
        })
        return;
    }
    apply.push({ id: role_id, name })

    mysql.sqlQuery(
        `update friends set apply='${JSON.stringify(apply)}' where id="${id}"; `,
        (results) => { });
    res.send({
        code: 0,
        data: '申请成功'
    })
});

// 加入势力处理
router.post("/active", async (req, res) => {
    const { role_id, id, state } = req.body;
    if (!role_id || !state || id) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { results } = await mysql.asyncQuery(`select * from socialize  where id="${id}"`);
    const role = await roleFn.getRoleInfo(req, res, role_id);
    const socialize = JSON.stringify(role.socialize_pool);
    const compose = JSON.parse(results['compose']);
    const apply = JSON.parse(results['apply']);
    const role_a = apply.filter(({ id }) => id == role_id);
    // 判断是否加入了其他势力
    if (socialize[TYPE_MEUN_NAME[results.type]]) {
        mysql.sqlQuery(
            `update socialize set apply='${JSON.stringify(role_a)}' where id="${id}"; `,
            (results) => { });
        res.send({
            code: 100007,
            message: `玩家已加入其他${TYPE_MEUN[results.type]}`
        })
        return;
    }
    // 判断是否同意
    if (stata) {
        compose.push(apply_itme);
        socialize[TYPE_MEUN_NAME[results.type]] = {
            id,
            name: results['name']
        }
        mysql.sqlQuery(
            `update role  SET socialize_pool='${JSON.stringify(socialize)}'  where role_id="${role_id}"`,
            results => {
                return res(results);
            }
        );
    }
    mysql.sqlQuery(
        `update socialize set compose='${JSON.stringify(compose)}',apply='${JSON.stringify(role_a)}' where id="${id}"; `,
        (results) => { });
    res.send({
        code: 0,
        data: ''
    })
});

// 退出势力
router.post("/exit", async (req, res) => {
    const { id } = req.body;
    const role = await roleFn.getRoleInfo(req, res);
    const { results } = await mysql.asyncQuery(`select * from socialize  where id="${id}"`);
    const compose = JSON.stringify(results.compose);
    const compose_new = compose.filter(({ id }) => id != role.role_id)
    // 删除势力成员
    mysql.sqlQuery(
        `update socialize set compose='${JSON.stringify(compose_new)}' where id="${id}"; `,
        (results) => { });
    //  对应势力
    const socialize = JSON.stringify(socialize);
    delete socialize[TYPE_MEUN_NAME[results.type]];
    mysql.sqlQuery(
        `update role  SET socialize_pool='${JSON.stringify(socialize)}'  where role_id="${role.role_id}"`,
        results => {
            return res(results);
        }
    );
    res.send({
        code: 0,
        data: ''
    })
});


module.exports = router;
