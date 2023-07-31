const { RoleG } = require("../../global");
const { AttributeTable, Effect1Table } = require("../../table");
const effect1 = require("../../table/effect1");
module.exports = {
    /**
     * 获取坐标内所有玩家
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleInfo 角色信息
     * @param {*} data.role_id 角色id,可选参数,传此参数代表非自身
     * @param {*} data.attr 需要计算的属性,可选参数,默认为全部
     * @returns {*} roleInfo[]|undefined
     * 
     */
    computeRoleAttr: function (req, res, roleInfo, { role_id, attr = AttributeTable.getInitAttr() } = {}) {
        const { role_attr, role_buff } = roleInfo;
        const { base, addition } = role_attr;
        // 基础属性与额外属性
        Object.keys(attr).forEach((key) => {
            attr[key] += base[key] || 0;
            attr[key] += addition[key] || 0;
        })
        // buff属性
        let { attr: attrBuff, vip } = role_buff;
        const buffs = [];
        attrBuff = attrBuff.filter(({ e, d }) => {
            if (d < new Date() * 1) return false;
            const { text } = effect1.effect1Fn(e, attr, base);
            buffs.push({
                text,
                end: d
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
        // 玩家自己的情况下,更新buff
        if (!role_id) {
            // 更新buff
            RoleG.updataRoleGlobal(req, res, { role_buff: { attr: attrBuff, vip } });

        }
        // 最后计算宠物附体
        // const pet = Global.getPetGlobal(req, role_id) || { state: 0 };
        // let petAttr = {
        //     life_max: 0,
        //     life: 0,
        // }
        // let rate = pet.art[1].l === -1 ? 0 : pet.art[1].v / 100;
        // if (pet.state === 2 && rate) {
        //     petAttr = petFn.computeAttr(pet, petAttr);
        //     Object.keys(petAttr).forEach(key => {
        //         attr[key] += parseInt(petAttr[key] * rate);
        //     })
        // }

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

