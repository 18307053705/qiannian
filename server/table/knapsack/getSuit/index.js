const { SUIT_TYPE, SUIT_EFFECT } = require('./suitJosn');
const { AttrSystem } = require('@/system');


const suitFn = {
    /**
     * 基础属性
     * @param {*} suit 套装信息
     * @param {*} num 佩戴数量 
     */
    [SUIT_TYPE.BASE_ATTR]: function (suit, num) {
        const { name, san, wu, career } = suit;
        let attr = AttrSystem.getRoleBaseAttr(career);
        let tAttr = AttrSystem.getRoleBaseAttr(career);
        let addition = wu;
        let tAddition = wu;
        const meet = num === 5 ? 5 : (num >= 3 ? 3 : 0)
        if (meet !== 5) {
            attr = {
                life: attr.life,
                life_max: attr.life_max,
                mana: attr.mana,
                mana_max: attr.mana_max,
            }
            addition = san;
            if (meet === 0) {
                tAttr = {
                    life: tAttr.life,
                    life_max: tAttr.life_max,
                    mana: tAttr.mana,
                    mana_max: tAttr.mana_max,
                }
                tAddition = san;
            }
        }
        Object.keys(attr).forEach((key) => {
            attr[key] *= addition;
        })
        Object.keys(tAttr).forEach((key) => {
            tAttr[key] *= tAddition;
        })
        return {
            name: `${name}(${num}/${num > 3 ? 5 : 3})`,
            attr,
            tAttr,
            meet: num === 5 ? 5 : (num >= 3 ? 3 : 0)
        }
    },
    /**
    * 首饰属性
    * @param {*} suit 套装信息
    * @param {*} num 佩戴数量 
    */
    [SUIT_TYPE.JEWElRY]: function (suit, num) {
        const { name, er: addition, career } = suit;
        let attr = AttrSystem.getRoleBaseAttr(career);
        attr = {
            atk_max: attr.atk_max,
            atk_min: attr.atk_min,
            dfs_max: attr.dfs_max,
            dfs_min: attr.dfs_min,
        }
        Object.keys(attr).forEach((key) => {
            attr[key] *= addition;
        })
        return {
            name: `${name}(${num}/2)`,
            attr,
            meet: num === 2 ? 2 : 0
        }
    },
    /**
     * 元素套装
     * @param {*} suit 套装信息
     * @param {*} num 佩戴数量 
     */
    [SUIT_TYPE.ELE]: function (suit, num) {
        const { name, er: addition, ele } = suit;
        let attr = AttrSystem.getInitEleAttr();
        if (ele === 1) {
            attr = {
                ice_atk_min: attr.ice_atk_min,
                ice_atk_max: attr.ice_atk_max,
                ice_dfs_min: attr.ice_dfs_min,
                ice_dfs_max: attr.ice_dfs_max,
            }
        }
        if (ele === 2) {
            attr = {
                mine_atk_min: attr.mine_atk_min,
                mine_atk_max: attr.mine_atk_max,
                mine_dfs_min: attr.mine_dfs_min,
                mine_dfs_max: attr.mine_dfs_max,
            }
        }
        if (ele === 3) {
            attr = {
                wind_atk_min: attr.wind_atk_min,
                wind_atk_max: attr.wind_atk_max,
                wind_dfs_min: attr.wind_dfs_min,
                wind_dfs_max: attr.wind_dfs_max,
            }
        }
        if (ele === 4) {
            attr = {
                water_atk_min: attr.water_atk_min,
                water_atk_max: attr.water_atk_max,
                water_dfs_min: attr.water_dfs_min,
                water_dfs_max: attr.water_dfs_max,
            }
        }
        if (ele === 5) {
            attr = {
                fire_atk_min: attr.fire_atk_min,
                fire_atk_max: attr.fire_atk_max,
                fire_dfs_min: attr.fire_dfs_min,
                fire_dfs_max: attr.fire_dfs_max,
            }
        }

        Object.keys(attr).forEach((key) => {
            attr[key] *= addition;
        })
        return {
            name: `${name}(${num}/2)`,
            attr,
            meet: num === 2 ? 2 : 0
        }
    },
    /**
     * 九纹大道の钟~山河社稷の图 专属
     * @param {*} suit 套装信息
     * @param {*} num 佩戴数量 
     */
    [SUIT_TYPE.JIU_ZHOU]: function (suit, num) {
        const { name, er: addition, career } = suit;
        let attr = AttrSystem.getRoleBaseAttr(career);
        Object.keys(attr).forEach((key) => {
            attr[key] *= addition;
        })
        return {
            name: `${name}(${num}/2)`,
            attr,
            meet: num === 2 ? 2 : 0
        }
    },
    /**
     * 青莲造化の盏~大道轮回の印 专属
     * @param {*} suit 套装信息
     * @param {*} num 佩戴数量 
     */
    [SUIT_TYPE.DAO_JUN]: function (suit, num) {
        const { name, er: addition } = suit;
        const attr = AttrSystem.getInitEleAttr();
        Object.keys(attr).forEach((key) => {
            attr[key] *= addition;
        })
        return {
            name: `${name}(${num}/2)`,
            attr,
            meet: num === 2 ? 2 : 0
        }
    },
}





module.exports = {
    /**
     * 获取套装信息
     * @param {*} groupId 
     * @returns suit || undefined
     * @returns suit.fn (suit:套装属性,num:佩戴数量)=>{attr:属性,name}
     * @returns suit.ids 装备id
     * @returns suit.career 职业
     * @returns suit.type 套装类型
     */
    getSuit: function (groupId) {
        const suit = SUIT_EFFECT[groupId] ? JSON.parse(JSON.stringify(SUIT_EFFECT[groupId])) : undefined;
        if (suit) {
            suit['fn'] = suitFn[suit.type];
        }
        return suit;

    }
}