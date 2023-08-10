const { ArtTable } = require("../../table");
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

const effect_attr = {
    4: 10,
    5: 20,
    6: 30,
    7: 50
}
module.exports = {
    /**
     * 计算技能属性
     * @param {*} art 技能信息
     * @returns attr 存在,代表计算被动
     * @returns artInfo.d 消耗
     * @returns artInfo.t 目标
     * @returns artInfo.v 伤害
     * @returns artInfo.e 效果
     */
    artComputeAttr: function (art) {
        const { effect, up, rp, v, d, p, t } = ArtTable.getArt(art.id);
        const { l, r } = art;
        // 最新技能信息
        const artInfo = {
            d: d * r_attr[r] * l // 法力消耗
        }
        // 判断是否为单攻,四转可觉醒特效
        if (p === 1) {
            // 技能伤害 = 基础伤害 + 升华加成 + 等级加成
            artInfo['v'] = v + (r * rp) + (l * up);
            if (r >= 4) {
                // artInfo['e'] = {};
                // 特效信息
                artInfo['e'] = effect.split(',').map((e) => {
                    const [key] = e.split('-');
                    return `${key}-${effect_attr[r]}`;
                }).join(',');
            }
        }
        // 判断是否为群攻,四转可增加攻击数量
        if (p === 2) {
            // 技能伤害 = 基础伤害 + 升华加成 + 等级加成
            artInfo['v'] = v + (r * rp) + (l * up);
            // 攻击数量 默认t 四转后每提升一转增加一个目标
            artInfo['t'] = r > 4 ? (t + r - 3) : t;

        }
        // 判断是否为buff技能
        if (p === 3) {
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
        if (p === 4) {
            attr = {};
            artInfo['v'] = v.split(',').map((e) => {
                const [key, value] = e.split('-');
                const val = value * r_attr[r] * l;
                // 属性加成无法直接识别atk 与 dfs
                if(key === 'atk' || key === 'dfs'){
                    attr[`${key}_max`] = val;
                    attr[`${key}_min`] = val;
                }else{
                    attr[key] = val
                }
                // 被动属性 = 基础值 * 转数加成 * 等级
                return `${key}-${val}`
            }).join(',');
        }
        // 宠物附体技能
        if (p === 6) {
            artInfo['v'] = v * l;
        }
        return {
            attr,
            artInfo
        }
    }
};
