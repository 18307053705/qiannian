const { roleFn, grandFn, qingyuanFn } = require('../../utils');
const { RoleG, KnapsackG } = require("../../global");
module.exports = {
    /**
     * 解除结缘
     */
    finish: async function (req, res) {
        const { qingyuan: iQingYuan } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        const { rId } = iQingYuan.d;
        const qingyuan = await qingyuanFn.getQingyuanInfo(req, res);
        if (!qingyuan) {
            res.send({
                code: 0,
                message: '解除失败，未曾结缘！'
            })
            return;
        }
        const { level } = qingyuan;
        const drain = level * 200;
        if (yuanbao < drain) {
            res.send({
                code: 0,
                message: `解除失败，元宝不足${drain}！`
            })
            return;
        }
        // 消耗对应数量元宝
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - drain });
        // 删除数据库对应姻缘
        await qingyuanFn.deleteQingyuan(req, res);
        // 姻缘树等级加成删除
        if (level > 0) {
            await qingyuanFn.terrAttr(req, res, level);
        }
        // 获取对方信息
        const { qingyuan: tQingYuan } = await roleFn.getRoleInfo(req, res, { role_id: rId });
        // 双方关系删除
        RoleG.updataRoleGlobal(req, res, { qingyuan: { s: iQingYuan.s } });
        await roleFn.updataRoleInfo(req, res, { qingyuan: { s: tQingYuan.s } }, rId);
        // 返回地图
        grandFn.tpDirUpdate(req, res);
    }
}
