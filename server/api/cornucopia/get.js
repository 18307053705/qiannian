const { RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { cornuconpiaFn } = require('../../utils');
module.exports = {
    /**
     * 获取聚宝盆信息
     * @param {*} req 
     * @param {*} res 
     */
    get: function (req, res) {
        const { treasure_pool, role_level } = RoleG.getRoleGlobal(req, res);
        const { id } = treasure_pool['jbp'];
        let name = ''
        if (id == 0) {
            const { id: jbpId, n } = cornuconpiaFn.getPrize(treasure_pool['jbp'])
            treasure_pool['jbp']['id'] = jbpId;
            name = n;
            RoleG.updataRoleGlobal(req, res, { treasure_pool });
        } else {
            name = knapsackTable.getArticle(id).n;
        }

        res.send({
            code: 0,
            data: {
                jbp: {
                    ...treasure_pool['jbp'],
                    id: name
                },
                limits: role_level >= 50
            }
        })
    }
}