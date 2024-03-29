module.exports = {
    /**
    * 获取怪物对应基础属性
    * @param {*} career 职业1-9
    * @returns {*} attr:对应基础属性,不包含元素属性
    */
    getFreakBaseAttr: function (career) {
        // 法皇,血煞,星君 攻击职业
        if ([1, 4, 7].includes(career)) {
            return {
                life: 200,
                mana: 150,
                atk_max: 12,
                atk_min: 10,
                dfs_max: 4,
                dfs_min: 2,
                hit: 2,
                dodge: 1,
                sudden: 1
            }
        }
        // 战尊,战狂,战神 防御职业
        if ([2, 5, 8].includes(career)) {
            return {
                life: 250,
                mana: 180,
                atk_max: 10,
                atk_min: 8,
                dfs_max: 5,
                dfs_min: 3,
                hit: 2,
                dodge: 1,
                sudden: 1
            }
        }
        // 羽圣,赤魅,剑仙 敏捷职业
        if ([3, 6, 9].includes(career)) {
            return {
                life: 180,
                mana: 120,
                atk_max: 10,
                atk_min: 8,
                dfs_max: 4,
                dfs_min: 2,
                hit: 4,
                dodge: 2,
                sudden: 2
            }
        }
        // 默认均衡职业，目前不存在
        return {
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
