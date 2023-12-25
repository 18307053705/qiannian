const { qingyuanFn } = require('@/utils');
const { DailysG } = require("@/global");
module.exports = {
    /**
     * 树打理
     * @param type 1:浇水,2:除草
     */
    treeManage: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { qingyuan } = RoleG.getRoleGlobal(req, res);
        const { d } = qingyuan;
        if (!d) {
            res.send({
                code: 0,
                message: `你没有姻缘树，快去姻缘石与心仪之人结缘吧！`
            })
            return;
        }
        const { QingYuan } = DailysG.getDailysGlobal(req, res);
        const { j, c } = QingYuan;
        let drain = 0;
        let cExp = 1;
        // 浇水
        if (type === 1 && j > 3) {
            drain = 1000 * (2 ** (j - 3));
            cExp = 2;
        }
        // 除草
        if (type === 2 && c > 3) {
            drain = 1000 * (2 ** (c - 3));
            cExp = 2;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        if (tael < drain) {
            res.send({
                code: 0,
                message: `银两不足${drain},${type === 1 ? '浇水' : '除草'}姻缘树失败！`
            })
            return;
        }
        // 前置条件通过
        // 消耗银两
        if (drain) {
            KnapsackG.updateknapsackGlobal(req, res, { tael: tael - drain });
        }
        // 处理全局操作次数
        if (type === 1) {
            QingYuan.j += 1;
        } else {
            QingYuan.c += 1;
        }
        DailysG.updataDailysGlobal(req, res, { QingYuan });
        // 计算操作后的情缘信息
        qingyuanFn.computeTerrLevel(req, res, cExp)
        res.send({
            code: 0,
            data: 'ok'
        })
    }
}
