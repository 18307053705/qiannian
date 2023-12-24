const { PetG, FightG } = require("@/global");
const { knapsackTable } = require("@/table");
const AttrSystem = require("@/system/AttrSystem");
module.exports = {
  /**
   * 创建玩家属性
   * @param req
   * @param res
   * @returns player 自身信息
   */
  creatPlayer: function (req, res, type, role_id) {
    const { FIGHT_TYPE } = FightG;
    const roleInfo = RoleG.getRoleGlobal(req, res, role_id);
    const knapasack = KnapsackG.getknapsackGlobal(req, res, role_id);
    const pet = PetG.getPetGlobal(req, res, role_id);
    const { fight } = roleInfo.skill_pool;
    const knapasackId = {};
    fight.forEach((itme, index) => {
      if (itme.p == 2) {
        if (knapasackId[itme.id]) {
          knapasackId[itme.id][index].push(index);
        } else {
          knapasackId[itme.id] = {
            id: itme.id,
            index: [index]
          };
        }
      }
    });
    // 判断战斗设置中是否有消耗物品
    if (JSON.stringify(knapasackId) !== "{}") {
      const { data } = knapasack;
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const { id, name, s } = data[i];
        // Id存在战斗设置中,且为消耗品
        if (knapasackId[id] && knapsackTable.isReply(id)) {
          knapasackId[id]["index"].forEach((index) => {
            fight[index] = {
              n: name,
              s,
              p: 2,
              id
            };
          })
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
          knapasackId[key]["index"].forEach((index) => {
            fight[index] = {
              ...fight[index],
              s: 0,
            };
          })
        });
      }
    }
    // 更新战斗信息
    RoleG.updataRoleGlobal(req, res, { skill_pool: roleInfo.skill_pool }, role_id);
    // 计算角色属性
    const data = AttrSystem.computeRoleAttr(roleInfo, { pet });
    // 获取宠物信息
    let petInfo;
    if (pet) {
      petInfo = {
        name: pet.name,
        attr: AttrSystem.computePetAttr(pet),
        art: pet["art"][0],
      };
    }
    // 切磋满状态,非死斗则是真实状态
    const attr = type === FIGHT_TYPE.duel ? data.attr : {
      ...data.attr,
      life: roleInfo['life'] > data.attr.life_max ? data.attr.life_max : roleInfo['life'],
      mana: roleInfo['mana'] > data.attr.mana_max ? data.attr.mana_max : roleInfo['mana'],
    };

    return {
      simplePlayer: {
        role_id: roleInfo.role_id,
        name: roleInfo.role_name,
        life: attr.life,
        mana: attr.mana,
        life_max: attr.life_max,
        mana_max: attr.mana_max,
      },
      completePlayer: {
        role_id: roleInfo.role_id,
        name: roleInfo.role_name,
        attr,
        art: fight,
        pet: petInfo,
        buffs: {},
      },
    };
  },
};
