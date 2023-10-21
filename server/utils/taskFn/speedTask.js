const { chekeKnapsack } = require('../knapsackFn/chekeKnapsack');
const { GrandG } = require('../../global');
module.exports = {
    /**
     * 获取任务进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} task 
     * @returns done true 完成
     * @returns exist 当前物品信息
     * @returns fight 当前杀怪信息
     */
    speedTask: function (req, res, task) {
        // 完成条件 freak{id,n,s,c} article{id,p,n,s}
        const { complete, grand } = task;
        // 对话任务 
        if (!complete) {
            const { currentDir } = GrandG.getDirGlobal(req, res);
            const { tNpc } = grand;
            // 判断是否为NPC自身，是直接完成任务
            return { done: !tNpc || currentDir.id === tNpc.id && currentDir.address === tNpc.address }
        }
        const { freak, article } = complete;
        let done = true;
        let exist = undefined;
        if (article) {
            const { exist: exists, result } = chekeKnapsack(req, res, article);
            done = result;
            exist = exists;
        }
        if (freak) {
            Object.values(freak).map(({ s, c }) => {
                if (s > c) {
                    done = false;
                }
            })
        }
        return {
            done,
            exist,
            fight: JSON.stringify(freak) === '{}' ? undefined : freak
        }
    }
}