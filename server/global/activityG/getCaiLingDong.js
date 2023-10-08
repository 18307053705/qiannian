const { CAI_LIN_DONG } = require('./config');
module.exports = {
    /**
     * 获取世界boss信息
     * @returns ids {role_id:1} 可领奖id，对应排名等级
     * @returns done 完成领奖id
     * @returns rank 排名信息 {rank_id:{v,s}}
     * @returns create 是否可创建
     */
    getCaiLingDong: function (req, res) {
        return JSON.parse(JSON.stringify(CAI_LIN_DONG))
    }
}