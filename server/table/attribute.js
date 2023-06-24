// life_max-最大生命
// life-当前生命
// mana_max-最大法力
// mana-当前法力
// atk-攻击
// dfs-防御
// hit-命中
// dodge-闪避
// sudden-暴击
// ice_atk-冰攻
// mine_atk-雷攻,
// wind_atk-风攻
// water_atk-水攻,
// fire_atk-火攻
// ice_dfs-冰防
// mine_dfs-雷防
//  wind_dfs-风防
//  water_dfs-水防,
//  fire_dfs-火防

module.exports = {
    getAttr: function (career) {
        let roleAttr = this.roleAttr;
        let attr = roleAttr['atk'];
        if (career % 3 === 2) {
            attr = roleAttr['def']
        }
        if (career % 3 === 0) {
            attr = roleAttr['agile']
        }
        if (career == 0) {
            attr = roleAttr['balanced']
        }
        return { ...attr }
    },
    getInitAttr: function () {
        return {
            life_max: 0,
            life: 0,
            mana_max: 0,
            mana: 0,
            atk_max: 0,
            atk_min: 0,
            dfs_max: 0,
            dfs_min: 0,
            hit: 0,
            dodge: 0,
            sudden: 0,
            ice_atk_max: 0,
            ice_atk_min: 0,
            ice_dfs_max: 0,
            ice_dfs_min: 0,
            mine_atk_max: 0,
            mine_atk_min: 0,
            mine_dfs_max: 0,
            mine_dfs_min: 0,
            wind_atk_max: 0,
            wind_atk_min: 0,
            wind_dfs_max: 0,
            wind_dfs_min: 0,
            water_atk_max: 0,
            water_atk_min: 0,
            water_dfs_max: 0,
            water_dfs_min: 0,
            fire_atk_max: 0,
            fire_atk_min: 0,
            fire_dfs_max: 0,
            fire_dfs_min: 0,
        }
    },
    MEUN: {
        life: '生命',
        mana: '法力',
        atk: '攻击',
        dfs: '防御',
        hit: '命中',
        dodge: '闪避',
        sudden: '暴击',
        ice_atk: '冰攻',
        mine_atk: '雷攻',
        wind_atk: '风攻',
        water_atk: '水攻',
        fire_atk: '火攻',
        ice_dfs: '冰防',
        mine_dfs: '雷防',
        wind_dfs: '风防',
        water_dfs: '水防',
        fire_dfs: '火防',
    },
    roleAttr: {
        atk: {
            life: 200,
            life_max: 200,
            mana: 150,
            mana_max: 150,
            atk_max: 12,
            atk_min: 10,
            dfs_max: 4,
            dfs_min: 2,
            hit: 2,
            dodge: 1,
            sudden: 1
        },
        def: {
            life: 250,
            life_max: 250,
            mana: 180,
            mana_max: 180,
            atk_max: 10,
            atk_min: 8,
            dfs_max: 5,
            dfs_min: 3,
            hit: 2,
            dodge: 1,
            sudden: 1
        },
        agile: {
            life: 180,
            life_max: 180,
            mana: 120,
            mana_max: 120,
            atk_max: 10,
            atk_min: 8,
            dfs_max: 4,
            dfs_min: 2,
            hit: 4,
            dodge: 2,
            sudden: 2
        },
        balanced: {
            life: 225,
            life_max: 225,
            mana: 150,
            mana_max: 150,
            atk_max: 12,
            atk_min: 10,
            dfs_max: 4,
            dfs_min: 3,
            hit: 3,
            dodge: 1,
            sudden: 2
        }
    },
    freakAttr: {
        atk: {
            life: 200,
            mana: 150,
            atk_max: 12,
            atk_min: 10,
            dfs_max: 4,
            dfs_min: 2,
            hit: 2,
            dodge: 1,
            sudden: 1
        },
        def: {
            life: 250,
            mana: 180,
            atk_max: 10,
            atk_min: 8,
            dfs_max: 5,
            dfs_min: 3,
            hit: 2,
            dodge: 1,
            sudden: 1
        },
        agile: {
            life: 180,
            mana: 120,
            atk_max: 10,
            atk_min: 8,
            dfs_max: 4,
            dfs_min: 2,
            hit: 4,
            dodge: 2,
            sudden: 2
        },
        balanced: {
            life: 225,
            mana: 150,
            atk_max: 12,
            atk_min: 10,
            dfs_max: 4,
            dfs_min: 3,
            hit: 3,
            dodge: 1,
            sudden: 2
        }
    },
    eleAttr: {
        ice_atk_min: 80,
        ice_atk_max: 120,
        mine_atk_min: 80,
        mine_atk_max: 120,
        wind_atk_min: 80,
        wind_atk_max: 120,
        water_atk_min: 80,
        water_atk_max: 120,
        fire_atk_min: 80,
        fire_atk_max: 120,
        ice_dfs_min: 80,
        ice_dfs_max: 120,
        mine_dfs_min: 80,
        mine_dfs_max: 120,
        wind_dfs_min: 80,
        wind_dfs_max: 120,
        water_dfs_min: 80,
        water_dfs_max: 120,
        fire_dfs_min: 80,
        fire_dfs_max: 120,
    }
}