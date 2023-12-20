const library = require('../0library');
const r_attr = {
    0: 1,
    1: 1.5,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 7,
    7: 10
}

module.exports = {
    /**
     * 技能升级
     * @param {*} art {l,r,id}
     * @returns art 升级后的技能信息：l,r,d,v,t
     * @returns addition 升级后增加的属性
     */
    artUpLevel: function (art) {
        const { effect, up, rp, v, d, p, t, effectValue } = library.getArt(art.id);
        const { l, r } = art;
        // 最新技能信息
        const artInfo = {
            d: d * r_attr[r] * l, // 法力消耗
            l,
            r
        }
        // 判断是否为单攻,四转可觉醒特效
        if (p === library.ART_TYPE.simple) {
            // 技能伤害 = 基础伤害 + 升华加成 + 等级加成
            artInfo['v'] = v + (r * rp) + (l * up);
            if (r >= 4 && effectValue) {
                // 特效信息
                console.log(data[art.id])
                artInfo['e'] = `${effect}-${effectValue[r - 4]}`;
            }
        }
        // 判断是否为群攻,四转可增加攻击数量
        if (p === library.ART_TYPE.aoe) {
            // 技能伤害 = 基础伤害 + 升华加成 + 等级加成
            artInfo['v'] = v + (r * rp) + (l * up);
            // 攻击数量 默认t 四转后每提升一转增加一个目标
            artInfo['t'] = r > 4 ? (t + r - 3) : t;
    
        }
        // 判断是否为buff技能
        if (p === library.ART_TYPE.buff) {
            artInfo['v'] = v.split(',').map((e) => {
                const [key, value] = e.split('-');
                // buff属性 = 基础值 * 转数加成 * 等级
                return `${key}-${value * r_attr[r] * l}`
            }).join(',');
            // 回合 默认t 四转后每提升一转增加2个回合
            artInfo['t'] = r > 4 ? (t + (r - 3) * 2) : t;
        }
        // 判断是否为被动
        let attr = undefined;
        if (p === library.ART_TYPE.passive) {
            delete artInfo.d;
            attr = {};
            artInfo['v'] = v.split(',').map((e) => {
                const [key, value] = e.split('-');
                const val = value * r_attr[r] * l;
                // 属性加成无法直接识别atk 与 dfs
                if (key === 'atk' || key === 'dfs') {
                    attr[`${key}_max`] = val;
                    attr[`${key}_min`] = val;
                } else {
                    attr[key] = val
                }
                // 被动属性 = 基础值 * 转数加成 * 等级
                return `${key}-${val}`
            }).join(',');
        }
        // 宠物附体技能
        if (p === library.ART_TYPE.fuTi) {
            delete artInfo.d;
            artInfo['v'] = v * l;
        }
        return {
            attr,
            artInfo
        }
    }
}