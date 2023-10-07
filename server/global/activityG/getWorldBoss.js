const { WORLD_BOSS } = require('./config');
module.exports = {
    /**
     * 获取世界boss信息
     * @returns boss boss信息
     * @returns ids 可领奖id
     * @returns done 完成领奖id
     * @returns rank 排名信息 {role_id:{v,s}}
     * @returns create 是否可创建
     * @returns level boss等级, 随击杀次数提升
     * @returns shed 掉落物品,[id,s]
     */
    getWorldBoss: function (req, res) {
        return JSON.parse(JSON.stringify(WORLD_BOSS))
    }
}