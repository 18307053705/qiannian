const { KnapsackG, ErrorG } = require('../../global');
module.exports = {
    /**
     * 免费装备锻造,最大20
     * @param req.in_x 装备在背包内的下标
     */
    freeForgeEquip: (req, res) => {
        const { in_x } = req.body;
        if (in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const equip = data[in_x] || {};
        if (equip['p'] !== 3) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const [firm, forge, ...exts] = equip['ext'].split('_');
        if (forge >= 20) {
            res.send({
                code: 0,
                message: '无法继续锻造。'
            })
            return;
        }
        let rate = 0;
        if (forge > 10) {
            rate = 25 - (forge - 10) * 2
        } else if (forge > 5) {
            rate = 75 - (forge - 5) * 10
        } else {
            rate = 100 - forge * 5;
        }
        const num = Math.floor(Math.random() * (100 - 0)) + 1;
        let forgeNum = 0;
        if (rate === 100 || rate >= num) {
            forgeNum = Math.floor(Math.random() * 3) + 1;
            const ext = [firm, Number(forge) + forgeNum, ...exts].join('_');
            // 更新锻造等级
            data[in_x]['ext'] = ext;

        } else {
            data.splice(in_x, 1)
        }
        KnapsackG.updateknapsackGlobal(req, res, { data });
        res.send({
            code: 0,
            data: forgeNum,
        })
    }
};
