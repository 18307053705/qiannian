const { KnapsackG, ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');


module.exports = {
    /**
     * 装备镶嵌
     * @param req.material_inx 材料在背包内的下标
     * @param req.in_x 装备在背包内的下标
     */
    mosaicEquip: (req, res) => {
        const { material_inx, in_x } = req.body;
        if (material_inx === undefined || in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 验证装备信息
        const equip = data[in_x] || {};
        if (equip['p'] !== 3) {
            res.send({
                code: 0,
                message: '装备信息有误'
            })
            return;
        }
        // 验证宝石信息
        const { id, p, n } = data[material_inx] || {};
        if (id < 226 || id > 295 || p === 3) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        // 开始镶嵌
        // 0_0_0 _0_0_0_0_0
        const [firm, forge, sigil, ...gems] = equip['ext'].split('_');
        const index = gems.findIndex((num) => num == 0);
        if (index === -1) {
            res.send({
                code: 0,
                message: '装备已镶嵌满，无法继续镶嵌'
            })
            return;
        }
        const article = { [id]: { p, s: 1, n } };
        // 消耗对应的宝石
        const { message, delInx,data:newData } = knapsackFn.deleteKnapsack(req, res, { article });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }

        const { gem } = knapsackTable.getArticle(id);
        gems[index] = gem;
        const ext = [firm, forge, sigil, ...gems].join('_');
        let equipIndex = in_x;
        // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
        equipIndex -= delInx.filter((del_x) => del_x < in_x).length
        // 更新锻造等级
        newData[equipIndex]['ext'] = ext;
        KnapsackG.updateknapsackGlobal(req, res, { data: newData });
        res.send({
            code: 0,
            data: equipIndex,
            text: '镶嵌成功'
        })
    }
};
