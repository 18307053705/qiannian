const { KnapsackG, ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');


module.exports = {
    /**
     * 装备锻造
     * @param req.materialtype 材料类型(1:石头,2:元宝)
     * @param req.in_x 装备在背包内的下标
     */
    forgeEquip: (req, res) => {
        const { in_x, materialtype } = req.body;
        if (!materialtype || in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const equip = data[in_x] || {};
        if (!knapsackTable.isEquip(equip.id)) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const [firm, forge, ...exts] = equip['ext'].split('_');
        if (firm == 16 && forge == 50 || firm != 16 && forge == 20) {
            res.send({
                code: 0,
                message: '锻造已到最大级,无法继续锻造.'
            })
            return;
        }
        let isForge = false;
        const { level, career } = knapsackTable.getArticle(equip['id']);
        let materialId = [1849, 1849, 1853, 1857][career];
        let y_b = 20;
        if (level > 35) {
            materialId = [1850, 1850, 1854, 1858][career];
            y_b = 50;
        }
        if (level > 69) {
            materialId = [1851, 1851, 1855, 1859][career];
            y_b = 100;
        }
        if (level > 74) {
            materialId = [1852, 1852, 1856, 1860][career];
            y_b = 200;
        }
        let result = {
            data,
            delInx: []
        };
        if (materialtype === 1) {
            isForge = true;
            const { name } = knapsackTable.getArticle(materialId);
            const { message, data: chengData, delInx } = knapsackFn.deleteKnapsack(req, res, { [materialId]: { name, s: 1 } });
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            result = {
                data: chengData,
                delInx
            }
        }
        if (materialtype === 2) {
            isForge = true;
            const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
            if (y_b > yuanbao) {
                res.send({
                    code: 0,
                    message: '元宝不足'
                })
                return;
            }
            KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - y_b });
        }

        if (isForge) {
            const ext = [firm, Number(forge) + 1, ...exts].join('_');
            const { delInx, data: newData } = result;
            let index = in_x;
            // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
            index -= delInx.filter((del_x) => del_x < in_x).length
            // 更新锻造等级
            newData[index]['ext'] = ext;
            KnapsackG.updateknapsackGlobal(req, res, { data: newData });
            res.send({
                code: 0,
                data: index,
                text: '锻造成功'
            })
        }
    }
};
