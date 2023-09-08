const { roleFn, grandFn } = require('../../utils');
const { RoleG, KnapsackG } = require("../../global");
module.exports = {
    /**
     * 解除结缘
     */
    finish: async function (req, res) {
        const { qingyuan: iQingYuan } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        const { id, tId } = iQingYuan;
        if (id) {
            res.send({
                code: 0,
                message: '解除失败，未曾结缘！'
            })
            return;
        }
        if (yuanbao < 5000) {
            res.send({
                code: 0,
                message: '解除失败，元宝不足5000！'
            })
            return;
        }
        res.asyncQuery(`delete from qingyuan  where id="${id}"`);
        RoleG.updataRoleGlobal(req, res, { qingyuan: { s: iQingYuan.s } });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 5000 });
        const { qingyuan: tQingYuan } = roleFn.getRoleInfo(req, res, { role_id: tId });
        await roleFn.updataRoleInfo(req, res, { qingyuan: { s: tQingYuan.s } }, tId);
        grandFn.tpDirUpdate(req, res);
    }
}
