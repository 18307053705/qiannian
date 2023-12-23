const { KnapsackG, ErrorG } = require('@/global');
const { knapsackTable } = require('@/table');
const { cornuconpiaFn, knapsackFn } = require('@/utils');
module.exports = {
    /**
     * 开始聚宝
     */
    gather: function (req, res) {
        const { materialIds } = req.body;
        if (!materialIds) {
            ErrorG.paramsError(res);
            return;
        }
        const { treasure_pool, role_level } = RoleG.getRoleGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 角色等级未达到50级，为非法操作
        if (role_level < 50) {
            return;
        }
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理背包'
            })
            return;
        }
        // 计算消耗材料
        const AllTreasureMap = knapsackTable.geAllTreasureMap()
        const eleVal = {};
        const article = {};
        Object.keys(materialIds).forEach((id) => {
            const material = AllTreasureMap[id];
            const num = Number(materialIds[id]);
            if (!material) {
                return
            }
            const { value, ele, name } = material;
            eleVal[ele] = (eleVal[ele] || 0) + value * num;
            article[id] = {
                name,
                id: Number(id),
                s: num
            }
        })

        const eleValueList = Object.values(eleVal);
        const itme = eleValueList.find((value) => value < 100);
        if (eleValueList < 5 || itme) {
            res.send({
                code: 0,
                message: '材料不足,聚宝失败!'
            })
            return;
        }
        // 消耗对应材料
        const { message } = knapsackFn.deleteKnapsack(req, req, article);
        if (message) {
            res.send({
                code: 0,
                message: '材料不足,聚宝失败!'
            })
            return;
        }
        // 聚宝计算
        const rate = cornuconpiaFn.gatherRate(treasure_pool['jbp']);
        let { exp, lx, id } = treasure_pool['jbp'];
        let msg = '聚宝失败,聚宝经验+1';
        exp += 1;
        // 是否成功,背包增加对应物品
        if (rate) {
            const { name } = knapsackTable.getArticle(id);
            msg = `恭喜玩家成功聚宝,获得:聚宝经验+2,${name}`;
            exp += 1;
            knapsackFn.addKnapsack(req, res, { [id]: { id, name, s: 1 } });
        }
        // 计算聚宝盆等级经验等
        // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
        // 最大30级
        const level = lx / 3;
        let upExp = level * 10 + 10;
        if (level > 9) {
            upExp = level % 10 * 1000 + 1000;
        }
        if (level > 19) {
            upExp = level % 10 * 10000 + 10000;
        }
        if (level < 30 && exp >= upExp) {
            lx += 3;
            exp -= exp;
        }
        treasure_pool['jbp'].exp = exp;
        treasure_pool['jbp'].lx = lx;
        // 重新生成聚宝物品
        const { id: jbpId } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
        treasure_pool['jbp'].id = jbpId;
        RoleG.updataRoleGlobal(req, res, { treasure_pool });
        res.send({
            code: 0,
            data: msg
        })
    }
}
