const { roleFn } = require('../../utils');
const { DailysG, RoleG } = require("../../global");
module.exports = {
    /**
     * 获取姻缘信息
     */
    getMarriage: async function (req, res) {
        const { qingyuan, role_sex: irole_sex, address,role_id } = RoleG.getRoleGlobal(req, res)
        const { id, role } = qingyuan;
        // 判断是否存在天定姻缘之人
        if (id) {
            const { results } = await res.asyncQuery(`select * from qingyuan where id="${id}"`);
            const { QingYuan } = DailysG.getDailysGlobal(req, res);
            res.send({
                code: 0,
                data: {
                    qingYuan: {
                        info: results[0],
                        tree: QingYuan,
                        role_id
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
        const players = await roleFn.getAddressPlayers(req, res, address) || [];
        const list = [];
        players.forEach(({ role_sex, role_id, role_name }) => {
            if (irole_sex !== role_sex) {
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
