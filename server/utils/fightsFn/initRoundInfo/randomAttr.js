module.exports = {
    /**
     * 生成属性属性
     * @param req 
     * @param res
     */
    randomAttr: function (attr) {
        function random(max, min) {
            if (max && min) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return 0;
        }
        return {
            atk: random(attr['atk_max'], attr['atk_min']),
            dfs: random(attr['dfs_max'], attr['dfs_min']),
            ice_atk: random(attr['ice_atk_max'], attr['ice_atk_min']),
            ice_dfs: random(attr['ice_dfs_max'], attr['ice_dfs_min']),
            mine_atk: random(attr['mine_atk_max'], attr['mine_atk_min']),
            mine_dfs: random(attr['mine_dfs_max'], attr['mine_dfs_min']),
            wind_atk: random(attr['wind_atk_max'], attr['wind_atk_min']),
            wind_dfs: random(attr['wind_dfs_max'], attr['wind_dfs_min']),
            water_atk: random(attr['water_atk_max'], attr['water_atk_min']),
            water_dfs: random(attr['water_dfs_max'], attr['water_dfs_min']),
            fire_atk: random(attr['fire_atk_max'], attr['fire_atk_min']),
            fire_dfs: random(attr['fire_dfs_max'], attr['fire_dfs_min']),
            hit: attr.hit,
            dodge: attr.dodge,
            sudden: attr.sudden,
        }
    },

};
