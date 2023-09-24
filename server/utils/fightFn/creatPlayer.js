const { RoleG, FightG, GrandG, KnapsackG,PetG } = require("../../global");
const roleFn = require("../roleFn");
const petFn = require("../petFn");
module.exports = {
    /**
     * 创建玩家属性
     * @param {*} req 
     * @param {*} res 
     * @returns {*} player 自身信息
     */
    creatPlayer: function (req, res) {
        const roleInfo = RoleG.getRoleGlobal(req, res)
        const knapasack = KnapsackG.getknapsackGlobal(req, res);
        const pet = PetG.getPetGlobal(req, res);
        const { fight, art } = roleInfo.skill_pool;
        const knapasackId = {};
        fight.forEach((itme, index) => {
            if (itme && itme.p2 == 2) {
                knapasackId[itme.id] = {
                    id: itme.id,
                    index
                }
            }
        })
        // 判断战斗设置中是否有消耗物品
        if (JSON.stringify(knapasackId) !== "{}") {
            const { data } = knapasack;
            const len = data.length;
            for (let i = 0; i < len; i++) {
                const { id, p } = data[i];
                // Id存在战斗设置中,且为消耗品
                if (knapasackId[id] && p == 1) {
                    fight[knapasackId[id]['index']] = {
                        ...data[i],
                        p2: 2
                    }
                    // 删除该项
                    delete knapasackId[id];
                }
                // 结束循环
                if (JSON.stringify(knapasackId) == "{}") {
                    i = len;
                }
            }

            // 还存在的物品,为消耗殆尽
            if (JSON.stringify(knapasackId) !== "{}") {
                Object.keys(knapasackId).forEach((key) => {
                    fight[knapasackId[key]['index']] = {
                        ...fight[knapasackId[key]['index']],
                        s: 0
                    }
                })

            }
        }
        // 更新战斗信息
        RoleG.updataRoleGlobal(req, res, { skill_pool: roleInfo.skill_pool });
        // 计算角色属性
        const data = roleFn.computeRoleAttr(req, res, roleInfo);
        // 获取宠物信息
        const petInfo = {
            name: pet.name,
            attr: petFn.computePetAttr(pet),
            art: pet['art'][0]
        }
        return {
            roleId: roleInfo.role_id,
            attr: {
                ...data.attr,
                life: roleInfo['life'] > data.attr.life_max ? data.attr.life_max : roleInfo['life'],
                mana: roleInfo['mana'] > data.attr.mana_max ? data.attr.mana_max : roleInfo['mana'],
            },
            art: fight,
            name: roleInfo.role_name,
            pet: petInfo,
            buffs: {} // {role_id:{value:life:5000,atk:500,t:5,text:描述}}
        }
    },

};
