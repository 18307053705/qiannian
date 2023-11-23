const { KnapsackG, ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');

module.exports = {
    /**
     * 装备附魔
     * @param req.in_x 装备在背包内的下标
     */
    sigilEquip: (req, res) => {
        const { uid } = req.body;
        if (uid === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const in_x = data.findIndex((itme) => itme.uid === uid);
        const equip = data[in_x] || {};
        if (!knapsackTable.isEquip(equip.id)) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }

        const [firm, forge, sigilStr, ...exts] = equip['ext'].split('_');
        const sigil = Number(sigilStr);
        if (sigil == 9) {
            res.send({
                code: 0,
                message: '附魔已到最大级,无法继续附魔.'
            })
            return;
        }
        // 附魔材料id 魔符
        let materialId = 1889 + sigil;
        const { name } = knapsackTable.getArticle(materialId);
        const { message, data: newData, delInx } = knapsackFn.deleteKnapsack(req, res, { [materialId]: { name, s: 1 } });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        const ext = [firm, forge, sigil + 1, ...exts].join('_');
        let index = in_x;
        // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
        index -= delInx.filter((del_x) => del_x < in_x).length
        // 更新锻造等级
        newData[index]['ext'] = ext;
        KnapsackG.updateknapsackGlobal(req, res, { data: newData });
        res.send({
            code: 0,
            data: index,
            text: '附魔成功'
        })
    }
};
