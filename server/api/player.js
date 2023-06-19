const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const router = new express.Router();

// 申请
router.post("/playerApply", (req, res) => {
    const { role_id } = req.body;
    const { user, role } = Global.getUserRole(req);
    mysql.sqlQuery(
        `select * from friends  where role_id="${role.id}" or  role_id="${role_id}"`,
        results => {
            if (results) {
                const isRole = results[0]['role_id'] === role.id;
                const i_role = isRole ? results[0] : results[1];
                const tagter_role = isRole ? results[1] : results[0];
                const i_apply = JSON.parse(i_role.f_apply);
                const list = JSON.parse(i_role.f_list);
                const t_apply = JSON.parse(tagter_role.f_apply);
                if (i_apply.find(({ id }) => (id === tagter_role.role_id))) {
                    res.send({
                        code: 100004,
                        data: '申请重复'
                    })
                    return;
                }
                if (list.find(({ id }) => (id === tagter_role.role_id))) {
                    res.send({
                        code: 100004,
                        data: '已存在好友列表'
                    })
                    return;
                }
                mysql.sqlQuery(
                    `select * from role  where role_id="${role.id}" or  role_id="${role_id}"`, (nameMap) => {
                        const isMy = nameMap[0]['role_id'] === role.id;
                        const i_name = isMy ? nameMap[0] : nameMap[1];
                        const t_name = isMy ? nameMap[1] : nameMap[0];
                        i_apply.push({
                            id: tagter_role.role_id,
                            state: 0,
                            name: t_name.role_name,
                            tagter: 0

                        })
                        t_apply.push({
                            id: i_role.role_id,
                            state: 0,
                            name: i_name.role_name,
                            tagter: 1
                        })
                        mysql.sqlQuery(
                            `update friends set f_apply='${JSON.stringify(i_apply)}' where role_id="${i_role.role_id}"; `,
                            (results) => { })
                        mysql.sqlQuery(
                            `update friends set f_apply='${JSON.stringify(t_apply)}' where role_id="${tagter_role.role_id}"; `,
                            (results) => { })
                        res.send({
                            code: 0,
                            data: '申请成功'
                        })
                    })
                // if()






            }
        }
    );


});

// 申请处理
router.post("/playerApplyActive", async (req, res) => {
    const { role_id, state } = req.body;
    const { user, role } = Global.getUserRole(req);
    if (!role_id || !state) {
        res.send({
            code: 100005,
            data: '参数有误'
        })
        return false;
    }

    const { results } = await mysql.asyncQuery(`select * from friends  where role_id="${role.id}" or role_id="${role_id}"`);
    const isRole = results[0]['role_id'] === role.id;
    const i_role = isRole ? results[0] : results[1];
    const tagter_role = isRole ? results[1] : results[0];
    const i_apply = JSON.parse(i_role.f_apply);
    const i_list = JSON.parse(i_role.f_list);
    const t_apply = JSON.parse(tagter_role.f_apply);
    const t_list = JSON.parse(i_role.f_list);
    let i_info = undefined;
    let t_info = undefined;
    i_apply.forEach((itme) => {
        if (itme.id === tagter_role.role_id) {
            i_info = {
                name: itme.name,
                id: itme.id,
            };
            itme.state = state;
        }
    })
    t_apply.forEach((itme) => {
        if (itme.id === i_role.role_id) {
            t_info = {
                name: itme.name,
                id: itme.id,
            };
            itme.state = state;
        }
    })
    if (state === 1) {
        i_list.push(i_info)
        t_list.push(t_info)
    }
    const i_sql = [`f_list='${JSON.stringify(i_list)}'`, `f_apply='${JSON.stringify(i_apply)}'`];
    const t_sql = [`f_list='${JSON.stringify(t_list)}'`, `f_apply='${JSON.stringify(t_apply)}'`];
    mysql.sqlQuery(`update friends  SET ${i_sql.join(',')}  where role_id="${i_role.role_id}"`,()=>{});
    mysql.sqlQuery(`update friends  SET ${t_sql.join(',')}  where role_id="${tagter_role.role_id}"`,()=>{});
    res.send({
        code: 0,
        data: ''
    })
});

module.exports = router;