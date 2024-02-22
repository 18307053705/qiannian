const { KNAPSACK_Global } = require('./config');

module.exports = {
    /**
     * 获取全局背包ALL
     * @param {*} req 
     * @param {*} res 
     * @returns roles 全部角色信息
     * @returns iRole 自身信息
     */
    getknapsackAllGlobal: function (req, res) {
        const user = req.cookies["q_uid"];
        return {
            knapsacks: JSON.parse(JSON.stringify(KNAPSACK_Global)),
            // iKnapsack: JSON.parse(JSON.stringify(KNAPSACK_Global[user])),
        }

    }

}