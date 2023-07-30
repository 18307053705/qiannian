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
    /**
     * 获取属性文案枚举
     */
    getAttrMeun: () => {
        return {
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
        }
    }
}