const library = require("../0library");
const { computePetAttr } = require("./computePetAttr");
const { computePotentialAttr } = require("./computePotentialAttr");
const { getRealm } = require("@/table/realm/getRealm");
module.exports = {
    /**
     * 计算角色属性
     * @param {*} role 角色信息
     * @param {*} config.pet 宠物信息
     * @param {*} config.keys 需要计算的属性,可选参数,默认为全部
     * @returns {*} attr
     * @returns {*} buff
     * 
     */
    computeRoleAttr: function (req, res, role, config = {}) {
        const { pet, keys, upData } = config;
        const attr = library.getInitAttr(keys);
        if (!role) {
            console.log('调用computeRoleAttr函数：未传递role字段');
            return;
        }
        const { role_attr, role_buff, role_level, role_career, role_realm, role_id } = role;
        const { addition, potential } = role_attr;
        // 潜力属性
        const potentialAttr = computePotentialAttr(potential);
        // 玩家属性 = 职业属性 * 等级 * 境界
        const base = library.getRoleBaseAttr(role_career);
        const levelAttr = role_level * getRealm(role_realm).attr;
        // 基础属性与额外属性
        Object.keys(attr).forEach((key) => {
            if (base[key]) {
                base[key] *= levelAttr;
                attr[key] += base[key];
            }
            if (potentialAttr[key]) {
                attr[key] += potentialAttr[key];
            }
            attr[key] += addition[key];
        })

        // buff属性
        let { attr: attrBuff, vip } = role_buff;
        const buffs = [];
        attrBuff = attrBuff.filter(({ e, d }) => {
            if (d < new Date() * 1) return false;
            const { text } = library.effect1Fn(e, attr, base);
            buffs.push({
                text,
                d
            })
            return true;
        })
        Object.keys(vip).forEach(key => {
            // 判断buff是否过期,过期直接跳过,并且删除
            if (vip[key]['d'] < new Date() * 1) {
                delete vip[key];
                return;
            }
        })
        if (pet) {
            const rate = pet.art[1].l ? pet.art[1].v / 100 : 0;
            if (pet.state === 2 && rate) {
                const petAttr = computePetAttr(pet, { 'life_max': 0, 'life': 0 });
                Object.keys(petAttr).forEach(key => {
                    attr[key] += parseInt(petAttr[key] * rate);
                })
            }
        }
        // 计算结果取整
        Object.keys(attr).forEach((key) => { attr[key] = Math.floor(attr[key]) });

        // 
        if (upData) {
            const role_buff = JSON.parse(JSON.stringify({
                attr: buffs,
                vip
            }))
            // 更新战斗信息
            RoleG.updataRoleGlobal(req, res, { role_buff }, role_id);
        }
        // 返回属性与buff信息
        return {
            attr,
            buff: {
                attr: buffs,
                vip
            }
        }
    },
}
