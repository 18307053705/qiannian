const { chekeKnapsack } = require('../knapsackFn/chekeKnapsack');

module.exports = {
    /**
     * 获取任务进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} complete 完成条件 freak{id,n,s,c} article{id,p,n,s}
     * @returns done true 完成
     * @returns exist 当前物品信息
     * @returns fight 当前杀怪信息
     */
    speedTask: function (req, res, complete) {
        if (!complete) {
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
            fight: freak
        }
    }
}