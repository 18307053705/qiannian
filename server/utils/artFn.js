const ArtTable = require("../table/art");
const Attribute = require("../table/attribute");
const Global = require("../global");
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
    // 计算升级后技能等级
    artLevelCompute: function ({ l, r }) {
        if (r === 7) {
            return l === 100 ? false : { l: l + 1, r, p: 'l' };
        }
        if (r >= 5) {
            return l === 50 ? { l: 0, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r >= 3) {
            return l === 30 ? { l: 0, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        return l === 13 ? { l: 0, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
    },
    // 计算升级技能后属性
    artUpComputeAttr: function (req, old_art, up_art) {
        const art = ArtTable[old_art.id];
        // 判断是否升转
        const isR = up_art.l === 0 && up_art.r !== old_art.r;
        // 判断是否升华,是则保留上次法力消耗的20%
        let up_d = isR ? old_art['d'] * 0.2 : art['d'];
        // 技能消耗  =  基础消耗 * 升华加成 * 等级加成 + 升华前消耗(技能升华)
        up_d = art['d'] * r_attr[up_art['r']] * up_art['l'] + up_d;
        // 最新技能属性
        const artInfo = {
            ...old_art,
            ...up_art
        }
        // 判断是否为单攻,四转可觉醒特效
        if (art.p === 1) {
            // 技能伤害 = 基础伤害 + 升华加成 + 等级加成
            artInfo['v'] = art['v'] + (up_art.r * art.rp) + (up_art.l * art.up);
            artInfo['d'] = up_d;
            // 判断技能是否达到四转
            if (up_art.r >= 4) {
                let e = {};
                Object.keys(art['effect']).forEach((key) => {
                    e[key] = effect_attr[up_art.r];
                });
                artInfo['e'] = e;
            }
        }
        // 判断是否为群攻,四转可增加攻击数量
        if (art.p === 2) {
            artInfo['v'] = art['v'] + (up_art.r * art.rp) + (up_art.l * art.up);
            artInfo['d'] = up_d;
            artInfo['t'] = up_art.r > 3 ? up_art.r - 1 : 2;

        }
        // 判断是否为buff技能
        if (art.p === 3) {
            const up_v = {};
            Object.keys(art['effect']).forEach((key) => {
                // 升华保留上次属性的20%
                const old_v = isR ? up_art['v'][key] * 0.2 : art['v'][key];
                // 当前等级属性
                const c_v = art['effect'][key] * r_attr[up_art['r']] * up_art['l'];
                // 升级属性 = 当前等级属性 + 升华保留属性
                up_v[key] = c_v + old_v;
            });
            artInfo['v'] = up_v;
            artInfo['d'] = up_d;
            artInfo['t'] = up_art.r > 3 ? (up_art.r - 3) * 2 : 5;
        }
        // 判断是否为被动,是的话需要额外处理人物属性
        const up_attr = {};
        if (art.p === 4) {
            const up_v = {};
            Object.keys(art['effect']).forEach((key) => {
                // 升华保留上次属性的20%
                const old_v = isR ? old_art['v'][key] * 0.2 : art['v'][key];
                // 当前等级属性
                const c_v = art['effect'][key] * r_attr[up_art['r']] * up_art['l'];
                // 升级属性 = 当前等级属性 + 升华保留属性
                up_v[key] = c_v + old_v;
                // 增加属性 = 升级属性 - 原来属性
                up_attr[key] = up_v[key] - (old_art['v'][key] || 0);
            });
            artInfo['v'] = up_v;
        }
        // 技能计算结束--------更新角色属性
        const updata = {};
        const { addition_pool, skill_pool } = Global.getRoleGlobal(req);
        skill_pool['art'][old_art.id] = artInfo;
        updata['skill_pool'] = skill_pool;
        // 判断需要处理角色额外属性
        if (JSON.stringify(up_attr) !== '{}') {
            Object.keys(up_attr).forEach((key) => {
                if (key === 'atk' || key === 'dfs') {
                    addition_pool[`${key}_max`] += up_attr[key];
                    addition_pool[`${key}_min`] += up_attr[key];
                    return;
                }

                addition_pool[key] = (addition_pool[key] || 0) + up_attr[key];
            })
            updata['addition_pool'] = addition_pool;
        }
        Global.updateRoleGlobal(req, updata);
        return skill_pool['art'];
    },
    // 释放技能处理
    ArtHandler: function (req, id, player, in_x, fightRound) {
        const { skill_pool, role_id } = Global.getRoleGlobal(req);
        const { t = 1, d, n, v, p, e = {} } = skill_pool['art'][id];
        const { attr, name } = player[in_x];
        const mana = attr.mana - d;
        if (mana < 0) {
            return {
                message: `法力值不足,无法施展${n}`
            }
        }
        fightRound['mana'] = -d;
        // 消耗对应法力
        attr.mana = mana;
        if (p === 3) {
            const buffs = {
                t: t + 1,
                value: {},
                text: `${name}(${n}):`
            }
            Object.keys(v).forEach(key => {
                const val = v[key];
                // 保存buff属性加成
                buffs['value'][key] = val;
                // 保存buff描述文案
                buffs['text'] += `${Attribute.MEUN[key]}上限+${val},`
                if (key === 'life' || key === 'mana') {
                    player.forEach((itme) => {
                        itme.attr[`${key}_max`] += val;
                        itme.attr[key] += val;
                    })
                    return;
                }
                if (key === 'hit' || key === 'dodge' || key === "sudden") {
                    player.forEach((itme) => {
                        itme.attr[key] += val;

                    })
                    return;
                }
                player.forEach((itme) => {
                    itme.attr[`${key}_max`] += val;
                    itme.attr[`${key}_min`] += val;
                })
            })
            return {
                data: player.map((itme) => ({
                    ...itme,
                    buffs: {
                        ...itme.buffs,
                        [role_id]: buffs
                    }
                })),
                p: 3
            };
        }

        return {
            art: skill_pool['art'][id]
        };
    },

};
