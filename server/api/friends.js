const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const roleFn = require("../utils/roleFn");
const router = new express.Router();




// 获取好友列表
router.post("/list", async (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from friends  where role_id="${role_id}"`)
    res.send({
        code: 0,
        data: results[0]
    })
});

// 好友申请
router.post("/apply", async (req, res) => {
    const { role_id } = req.body;
    if (!role_id) {
        res.send({
            code: 100007,
            message: '参数有误'
        })
        return;
    }
    const { role_id: roleId, role_name } = Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from friends  where role_id="${role_id}"`);
    if (results[0]) {
        const apply = JSON.parse(results[0].apply);
        const list = JSON.parse(results[0].list);
        if (list.length === 200) {
            res.send({
                code: 0,
                message: '对方好友数已满，暂时无法申请。'
            })
            return;
        }
        if (apply.length === 100) {
            res.send({
                code: 0,
                message: '对方好友数申请过多，暂时无法申请。'
            })
            return;
        }
        if (apply.find(({ id }) => (id === roleId))) {
            res.send({
                code: 0,
                message: '申请重复'
            })
            return;
        }
        if (list.find(({ id }) => (id === roleId))) {
            res.send({
                code: 0,
                message: '已存在好友列表'
            })
            return;
        }
        // 加入对方的好友列表
        apply.push({
            id: roleId,
            n: role_name
        });

        await mysql.asyncQuery(`update friends set apply='${JSON.stringify(apply)}' where role_id="${role_id}"; `);
        res.send({
            code: 0,
            data: '申请成功，请等待对方确定',
        })
    }
});

// 申请处理
router.post("/active", async (req, res) => {
    const { role_id, state } = req.body;
    if (!role_id) {
        res.send({
            code: 100007,
            data: '参数有误'
        })
        return false;
    }

    const { role_id: roleId, role_name } = Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from friends  where role_id="${roleId}" or role_id="${role_id}"`);
    if (results) {
        const isRole = results[0]['role_id'] === roleId;
        const i_role = isRole ? results[0] : results[1];
        const t_role = isRole ? results[1] : results[0];
        let i_list = JSON.parse(i_role.list);
        let i_apply = JSON.parse(i_role.apply);
        let t_list = JSON.parse(t_role.list);
        let addInfo = undefined;
        // 找到申请中对应的信息
        i_apply = i_apply.filter((itme, index) => {
            if (itme.id === role_id) {
                addInfo = itme;
                return false;
            }
            return true;
        })
        // 通过并在申请列表中找到对应信息
        if (state && addInfo) {
            i_list.push({
                ...addInfo,
                i: 0, // 亲密度
            })
            t_list.push({
                id: roleId,
                n: role_name,
                i: 0, // 亲密度
            })
            const i_sql = [`list='${JSON.stringify(i_list)}'`, `apply='${JSON.stringify(i_apply)}'`];

            mysql.asyncQuery(`update friends  SET ${i_sql.join(',')} where role_id="${roleId}"`);
            await mysql.asyncQuery(`update friends  SET list='${JSON.stringify(t_list)}' where role_id="${role_id}"`);
            res.send({
                code: 0,
                data: ''
            })
        }
    }

});
module.exports = router;