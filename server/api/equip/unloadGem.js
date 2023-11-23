const { KnapsackG, ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');


module.exports = {
    /**
     * 装备宝石卸下
     * @param req.in_x 装备在背包内的下标
     */
    unloadGem: (req, res) => {
        const { uid } = req.body;
        if (uid === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const in_x = data.findIndex((itme) => itme.uid === uid);
        // 验证装备信息
        const equip = data[in_x] || {};
        if (!knapsackTable.isEquip(equip.id)) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        // 开始卸下宝石
        // 0_0_0 _0_0_0_0_0_0
        const [firm, forge, sigil, ...gems] = equip['ext'].split('_');
        const gem = gems[0];
        if (gem == 0) {
            res.send({
                code: 0,
                message: '该装备没有镶嵌宝石'
            })
            return;
        }
        // 查找对应宝石信息
        const gemInfo = knapsackTable.getGemInfo(gem);
        if (!gemInfo) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const { id, name } = gemInfo;
        const article = {
            [id]: {
                id,
                name,
                s: 1
            }
        }
        // 背包增加物品
        const { message, data: newData } = knapsackFn.addArticle(article, data);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }

        // 移出第一个位置的宝石
        gems.splice(0, 1);
        const ext = [firm, forge, sigil, ...gems, '0'].join('_');
        // 更改装备宝石信息
        newData[in_x]['ext'] = ext;

        KnapsackG.updateknapsackGlobal(req, res, { data: newData });
        res.send({
            code: 0,
            text: '卸下宝石成功'
        })
    }
};
