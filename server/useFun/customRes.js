const { ACTIVE_QUEUE } = require("../utils/scheduleCronstyleFn");
const RoleG = require("../global/roleG");
const mysql = require("../mysql");

module.exports = {
    customRes: function (req, res) {
        res.asyncQuery = mysql.asyncQuery;
        res.asyncAdd = mysql.asyncAdd;
        res.customSuccess = '';
        res.listText = [];
        const _send = res.send;
        res.send = function ({ success, message, ...data }) {
            res.send = _send;
            const tips = {
                error: message,
                success,
                listText: res.listText,
                customSuccess: res.customSuccess,
            }
            return res.send({
                ...data,
                message,
                success,
                // 提示信息
                tips,
                // 扩展信息
                exts: {
                    activeQueue: ACTIVE_QUEUE,
                    roleBase: RoleG.getRoleBase(req, res)
                },
                time: new Date()
            })
        }
    }
}
