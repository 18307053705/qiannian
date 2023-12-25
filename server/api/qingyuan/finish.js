const { QingyuanSql } = require('@/mysql');
const { roleFn, grandFn, qingyuanFn } = require('@/utils');
module.exports = {
    /**
     * 解除结缘
     */
    finish: async function (req, res) {
        const { qingyuan: iQingYuan } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        const { rId, id } = iQingYuan.d;
        const qingyuan = await QingyuanSql.asyncGetQingYuan(id);
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
        const results = [
            // 获取对方信息
            roleFn.asyncGetRoleInfo(req, res, rId),
            // 删除数据库对应姻缘
            QingyuanSql.asyncDeleteQingYuan(id),
        ];
        if (level > 0) {
            // 姻缘树等级加成删除
            results.push(qingyuanFn.terrAttr(req, res, level))
        }
        const [tRole] = await Promise.all(results)
        const { qingyuan: tQingYuan } = tRole;
        // 双方关系删除
        RoleG.updataRoleGlobal(req, res, { qingyuan: { s: iQingYuan.s } });
        await roleFn.updataRoleInfo(req, res, { qingyuan: { s: tQingYuan.s } }, rId);
        // 返回地图
        grandFn.tpDirUpdate(req, res);
    }
}
