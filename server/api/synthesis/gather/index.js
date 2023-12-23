const { GrandG } = require('@/global');
const { knapsackTable, ElementTable } = require('@/table');
const { knapsackFn } = require('@/utils');
const { randomGather } = require('./randomGather');

// 缓存上次时间
const roleIds = {

}

module.exports = {
    gather: function (req, res) {
        const { role_id, address } = RoleG.getRoleGlobal(req, res);
        const time = new Date() - (roleIds[role_id] || 0);
        // 冷却中
        if (time < 10000) {
            res.send(({
                code: 0,
                data: 10000 - time
            }))
            return;
        }
        const LevelIds = knapsackTable.getLevelIds();
        const data = randomGather(LevelIds, address);
        if (!data) {
            res.send(({
                code: 0,
                message: '采集天材地宝异常！'
            }))
            return;
        }
        // 触发战斗
        if (data.type) {
            GrandG.setCurrentDir(req, res, ElementTable.getElement(data.id));
            res.send({
                code: 0,
                path: '/fight'
            })
            return;
        }
        const { id, name } = knapsackTable.getArticle(data.id)
        const message = knapsackFn.addKnapsack(req, res, { [id]: { id, name, s: 1 } });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        roleIds[role_id] = new Date() * 1;
        res.send({
            code: 0,
            success: `突然你眼前一亮，定睛一看竟然是${name}。`
        })
    }
}
