const { WORLD_BOSS } = require('./config');

module.exports = {
    /**
     * 设置世界boss
     */
    setWorldBoss: function () {
        const { level, create } = WORLD_BOSS;
        // 已创建，避免重复创建
        if (create) {
            return;
        }
        const attr = level / 5;
        let ele = {};
        const boss = {
            life: 2000000 * level,
            life_max: 2000000 * level,
            mana_max: 2000000 * level,
            mana_max: 2000000 * level,
            atk_max: 1200 + Math.floor(1200 * attr),
            atk_min: 800 + Math.floor(800 * attr),
            dfs_max: 500 + Math.floor(500 * attr),
            dfs_min: 300 + Math.floor(300 * attr),
            hit: 200 + Math.floor(200 * attr),
            dodge: 100 + Math.floor(100 * attr),
            sudden: 100 + Math.floor(100 * attr),
        }
        if (level >= 10) {
            const min = 100 + Math.floor(100 * attr);
            const max = 120 + Math.floor(120 * attr);
            elt = {
                ice_atk_min: min,
                ice_atk_max: max,
                mine_atk_min: min,
                mine_atk_max: max,
                wind_atk_min: min,
                wind_atk_max: max,
                water_atk_min: min,
                water_atk_max: max,
                fire_atk_min: min,
                fire_atk_max: max,
                ice_dfs_min: min,
                ice_dfs_max: max,
                mine_dfs_min: min,
                mine_dfs_max: max,
                wind_dfs_min: min,
                wind_dfs_max: max,
                water_dfs_min: min,
                water_dfs_max: max,
                fire_dfs_min: min,
                fire_dfs_max: max,
            }
        }
        WORLD_BOSS.create = true;
        WORLD_BOSS.rank = {};
        WORLD_BOSS.done = [];
        WORLD_BOSS.ids = [];
        WORLD_BOSS.boss = {
            ...boss,
            ...ele
        };
    }
}