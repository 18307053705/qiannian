const mysql = require("../mysql");
const { realm: Realm } = require("../table/realm");
const { roleAttr: RoleAttr, getInitAttr } = require("../table/attribute");
const effect1 = require("../table/effect1");
const Global = require("../global/index2");
const petFn = require("./petFn");
module.exports = {
  // 获取玩家信息
  getRoleInfo: async function (req, role_id) {
    const roleInfo = Global.getRoleGlobal(req, role_id);
    if (roleInfo) {
      return roleInfo;
    }
    const { results } = await mysql.asyncQuery(`select * from role where role_id="${role_id}"`);
    if (results[0]) {
      const role = {}
      Object.keys(results[0]).forEach((key) => {
        role[key] = Global.JSON_KEYS.includes(key) ? JSON.parse(results[0][key]) : results[0][key]
      })
      return role;
    }
    return results[0];
  },
  // 更新玩家信息
  updateRoleInfo: async function (req, data, roleId) {
    const roleInfo = Global.updateRoleGlobal(req, data, roleId);
    if (roleInfo) {
      return roleInfo;
    }
    const upData = [];
    Object.keys(data).forEach(key => {
      const value = Global.JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
      upData.push(`${key}='${value}'`)
    })
    const { results } = await mysql.asyncQuery(`update role  SET ${upData.join(',')}  where role_id="${roleId}"`);
    return results

  },

  // 获取坐标对应的玩家数量
  getAddressPlayers: async function (req, address) {
    const roleInfo = await Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from role  where address="${address}" and role_id<>"${roleInfo.id}"`);
    return results;
  },

  // 计算角色属性 role_id(非自身的情况下才更新buff)
  computeRoleAttr: function (req, roleInfo, role_id) {
    const { role_attr, role_buff } = roleInfo;
    const { base, addition } = role_attr;
    const attr = getInitAttr();
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
    if (!role_id) {
      // 更新buff
      Global.updateRoleGlobal(req, { role_buff: { attr: attrBuff, vip } });

    }
    // 最后计算宠物附体
    const pet = Global.getPetGlobal(req, role_id) || { state: 0 };
    let petAttr = {
      life_max: 0,
      life: 0,
    }
    let rate = pet.art[1].l === -1 ? 0 : pet.art[1].v / 100;
    if (pet.state === 2 && rate) {
      petAttr = petFn.computeAttr(pet, petAttr);
      Object.keys(petAttr).forEach(key => {
        attr[key] += parseInt(petAttr[key] * rate);
      })
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
  // 升级经验
  computeUpLevel: function (level) {
    switch (parseInt(level / 10)) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        return 100 * (10 ** parseInt(level / 10)) * (level % 10 + 1);
      case 5:
        return 10000000 + (level % 10 + 1) * 5000000;
      case 6:
        return 50000000 + (level % 10 + 1) * 5000000;
      case 7:
        return 100000000 + (level % 10 + 1) * 10000000;
      case 8:
        return 300000000 + (level % 10 + 1) * 20000000;
      case 9:
        return 500000000 + (level % 10 + 1) * 50000000;
      default:
        return 1000000000 + (level % 10 + 1) * 500000000;
    }
  },
  // 计算经验
  computeRoleLevel: function (req, res, exp, callback) {
    const roleInfo = Global.getRoleGlobal(req);
    let { role_level, role_exp, role_realm, role_career, role_attr } = roleInfo;
    let [oldExp, upExp] = role_exp.split('/');
    let current = Number(oldExp) + exp;
    let base = undefined;
    // 当前经验大于升级经验,处理升级逻辑
    if (current >= upExp && role_level < 100) {
      current -= upExp;
      // 角色升级
      role_level++;
      // 获取境界对应属性增幅
      const { attr } = Realm[role_realm];
      const { atk, def, agile } = RoleAttr;
      // 根据职业选择升级属性加成
      switch (role_career) {
        case 1:
        case 4:
        case 7:
          base = { ...atk };
          break;
        case 2:
        case 5:
        case 8:
          base = { ...def };
          break;
        default:
          base = { ...agile };
      }
      Object.keys(base).forEach(key => {
        base[key] *= attr * role_level;
      })
      upExp = this.computeUpLevel(role_level);
    }
    const update = {
      role_exp: `${current}/${upExp}`,
      role_level,
    }
    if (callback) {
      // 计算经验时，还有其他需要更新的数据
      callback(roleInfo, update);
    }
    if (base) {
      role_attr.base = base;
      update['role_attr'] = role_attr;
      const { attr } = this.computeRoleAttr(req, roleInfo);
      update['life'] = attr.life_max;
      update['mana'] = attr.mana_max;

    }
    Global.updateRoleGlobal(req, update);

  }
};
