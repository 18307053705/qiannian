const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const router = new express.Router();




// 获取好友列表
router.post("/list", (req, res) => {
    const { role } = Global.getUserRole(req);
    mysql.sqlQuery(
        `select * from friends  where role_id="${role.id}"`,
        results => {
            res.send({
                code: 0,
                data: results[0]
            })
        }
    );
});

module.exports = router;