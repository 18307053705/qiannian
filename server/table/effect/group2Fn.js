const { RoleG } = require('../../global');

const BUFF_MEUN = {
    life_max: '生命上限',
    mana_max: '法力上限',
    atk: '攻击上限',
    dfs: '防御上限',
    exp2: '双倍经验,增加',
    exp3: '三倍经验,增加',
    exp5: '五倍经验,增加',
    money2: '双倍银两,增加',
    money3: '三倍银两,增加',
    money5: '五倍银两,增加',
}

// 半小时时间戳
const DateTitme = 1000 * 60 * 30;
function vipBuff(req, res, group, s) {
    const { role_buff } = RoleG.getRoleGlobal(req, res);
    const { vip } = role_buff;
    if (vip[group]) {
        vip[group]['d'] += DateTitme * s
    } else {
        vip[group] = { d: DateTitme * s + new Date() * 1 }
    }
    role_buff.vip = vip;
    RoleG.updataRoleGlobal(req, res, { role_buff });
    return { text: `${BUFF_MEUN[group]}${30 * s}分钟。` };
}

// 战斗属性buff
function attrBuff(req, res, group, s) {
    const [key, _, value] = group.split('-');
    const { role_buff } = RoleG.getRoleGlobal(req, res);
    let { attr } = role_buff;
    let add = true;
    attr = attr.map((itme) => {
        if (itme.e === group) {
            itme.d = itme.d + DateTitme * s;
            add = false;
        }
        return itme;
    })
    if (add) {
        attr.push(({
            e: group,
            d: DateTitme * s + new Date() * 1
        }))
    }
    role_buff.attr = attr;
    RoleG.updataRoleGlobal(req, res, { role_buff });
    return { text: `${BUFF_MEUN[key]}+${value},增加${30 * s}分钟。` };
}

// const exp2= vipBuff;
// const exp3=  vipBuff;
// const exp5= vipBuff;
// money2: vipBuff,
// money3: vipBuff,
// money5: vipBuff,
// atk: attrBuff,
// dfs: attrBuff,
// life_max: attrBuff,
// mana_max: attrBuff,

module.exports = {
    /**
     * 直接增加玩家属性的物品
     * @param {*} req 
     * @param {*} res 
     * @param {key_value} group
     * @param {number} s 使用数量
     * @returns { string } message 错误信息,存在则使用失败
     * @returns { string } text 使用成功信息,存在则使用成功
     */
    group2Fn: function (req, res, group, s = 1) {
        const [key] = group.split('-');
        return module.exports[key](req, res, group, s, key);
    },
    exp2: vipBuff,
    exp3: vipBuff,
    exp5: vipBuff,
    money2: vipBuff,
    money3: vipBuff,
    money5: vipBuff,
    atk: attrBuff,
    dfs: attrBuff,
    life_max: attrBuff,
    mana_max: attrBuff,
}

