const knapsackTable = require('@/table/knapsack');
const TaskTable = require('@/table/task');
module.exports = {
    /**
     * 解析任务奖励
     * @param {*} req 
     * @param {*} res 
     * @param {*} rewards 
     * @returns rewards
     */
    analyTaskReward: function (req, res, rewards) {
        if (!rewards) {
            return undefined;
        }
        const { article, fun } = rewards;
        if (fun) {
            return TaskTable.rewardFun[fun](req, res);
        }
        if (article) {
            rewards.article = {};
            const data = {};
            article.split(',').forEach((item) => {
                const [ids, s = 1] = item.split('-');
                const { id, name } = knapsackTable.getArticle(ids);
                data[id] = {
                    id,
                    name,
                    s: Number(s)
                }
            })
            rewards.article = data;
        }
        return rewards
    }
}


