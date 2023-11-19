module.exports = {
    /**
    * 获取宠物基础属性
    * @param {*} career 职业1-3
    * @returns {*} attr:对应基础属性,不包含元素属性
    */
    getPetBaseAttr: function (career) {
        // 攻击职业
        if (career === 1) {
            return {
                life: 20,
                life_max: 20,
                mana: 15,
                mana_max: 15,
                atk_max: 1.2,
                atk_min: 1,
                dfs_max: 0.4,
                dfs_min: 0.2,
                hit: 0.2,
                dodge: 0.1,
                sudden: 0.1
            }
        }
        // 防御职业
        if (career === 2) {
            return {
                life: 25,
                life_max: 25,
                mana: 18,
                mana_max: 18,
                atk_max: 1,
                atk_min: 0.8,
                dfs_max: 0.5,
                dfs_min: 0.3,
                hit: 0.2,
                dodge: 0.1,
                sudden: 0.1
            }
        }
        // 敏捷职业
        if (career === 3) {
            return {
                life: 18,
                life_max: 18,
                mana: 12,
                mana_max: 12,
                atk_max: 1,
                atk_min: 0.8,
                dfs_max: 0.4,
                dfs_min: 0.2,
                hit: 0.4,
                dodge: 0.2,
                sudden: 0.2
            }
        }
        return undefined;
        // // 默认均衡职业，目前不存在
        // return {
        //     life: 225,
        //     mana: 150,
        //     atk_max: 12,
        //     atk_min: 10,
        //     dfs_max: 4,
        //     dfs_min: 3,
        //     hit: 3,
        //     dodge: 1,
        //     sudden: 2
        // }
    },
}
