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
    MEUN: {
        life: '生命',
        mana: '法力',
        atk: '攻击',
        dfs: '防御',
        hit: '命中',
        dodge: '闪避',
        sudden: '暴击',
    },
    roleAttr: {
        atk: {
            life: 200,
            life_max: 200,
            mana: 150,
            mana_max:150,
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
}