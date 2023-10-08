const { JIN_YIN_DAO } = require('./config');
module.exports = {
    /**
     * 获取世界boss信息
     * @returns ids {role_id:5} 可领奖id对应可挖宝次数
     * @returns rank 排名信息 {gang_id:{v,s}}
     * @returns create 是否可创建
     */
    getJinYinDao: function (req, res) {
        return JSON.parse(JSON.stringify(JIN_YIN_DAO))
    }
}