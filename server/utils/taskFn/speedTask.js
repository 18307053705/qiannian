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
        const { complete, type, grand } = task;
        if (!complete) {
            if (type === 2) {
                const { currentDir } = GrandG.getDirGlobal(req, res);
                const { id, address } = currentDir;
                const { tNpc } = grand;
                return { done: id === tNpc.id && address === tNpc.address }
            }
            return { done: true }
        }
        const { freak, article } = complete;
        let done = true;
        let exist = undefined;
        if (article) {
            const { exist, result } = chekeKnapsack(req, res, article);
            done = result;
            exist = exist;
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