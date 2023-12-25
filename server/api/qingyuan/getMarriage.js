const { QingyuanSql } = require('@/mysql');
const { roleFn } = require('@/utils');
const { DailysG } = require("@/global");
module.exports = {
    /**
     * 获取姻缘信息
     */
    getMarriage: async function (req, res) {
        const { qingyuan, role_sex: iRoleSex, address, role_id, role_level } = RoleG.getRoleGlobal(req, res)
        const { d, role } = qingyuan;
        // 判断是否存在天定姻缘之人
        if (d) {
            const qingyuan = await QingyuanSql.asyncGetQingYuan(d.id);
            const { QingYuan } = DailysG.getDailysGlobal(req, res);
            res.send({
                code: 0,
                data: {
                    qingYuan: {
                        info: qingyuan,
                        tree: QingYuan,
                        role_id,
                        role_level
                    }
                }
            })
            return;
        }
        // 判断是否存在天定姻缘请求
        if (role) {
            res.send({
                code: 0,
                data: {
                    role
                }
            })
            return;
        }
        // 可申请情缘列表
        const players = await roleFn.getAddressPlayers(req, res, address);
        const list = [];
        players?.forEach(({ role_sex, role_id, role_name }) => {
            if (iRoleSex !== role_sex) {
                list.push({
                    role_id,
                    role_name
                })
            }
        })
        res.send({
            code: 0,
            data: {
                player: list,
            }
        })
    }
}
