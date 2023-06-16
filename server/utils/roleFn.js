const mysql = require("../mysql");
const errorFn = require("./errorFn");
const { realm: Realm } = require("../table/realm");
const { roleAttr: RoleAttr } = require("../table/attribute");
const Global = require("../global");
module.exports = {
  // 获取玩家信息
  getRoleInfo: async function (req, role_id) {
    const roleInfo = Global.getRoleGlobal(req, role_id);
    if (roleInfo) {
      return roleInfo;
    }
    const { results } = await mysql.asyncQuery(`select * from role  where role_id="${role_id}"`);
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

  // 计算角色属性
  computeRoleAttr: function (req, res, roleInfo, update) {
    try {
      const { base_pool: basePool, addition_pool: addition, buff_pool: buffPool } = roleInfo;
      const attr = {
        life_max: 0,
        life: 0,
        mana_max: 0,
        mana: 0,
        atk_max: 0,
        atk_min: 0,
        dfs_max: 0,
        dfs_min: 0,
        hit: 0,
        dodge: 0,
        sudden: 0,
        ice_atk_max: 0,
        ice_atk_min: 0,
        ice_dfs_max: 0,
        ice_dfs_min: 0,
        mine_atk_max: 0,
        mine_atk_min: 0,
        mine_dfs_max: 0,
        mine_dfs_min: 0,
        wind_atk_max: 0,
        wind_atk_min: 0,
        wind_dfs_max: 0,
        wind_dfs_min: 0,
        water_atk_max: 0,
        water_atk_min: 0,
        water_dfs_max: 0,
        water_dfs_min: 0,
        fire_atk_max: 0,
        fire_atk_min: 0,
        fire_dfs_max: 0,
        fire_dfs_min: 0,
      }

      // 计算基础属性
      this.computeBaseAttr(attr, basePool);
      // 计算buff属性
      const buff = this.computeRoleBuff(req, attr, buffPool, update);
      // 计算非时间限制属性: 装备,宠物,称号,技能,等
      Object.keys(addition).forEach((key) => {
        if (key === 'life' || key === 'mana') {
          attr[`${key}_max`] += addition[key];
          return;
        }
        attr[key] += addition[key];
      })
      return { attr, buff };
    } catch (error) {
      errorFn.error(res, errorFn.ERR_MEUN.ROLE);
      return '';
    }
  },
  // 计算角色基础属性
  computeBaseAttr: function (attr, basePool) {
    const { base, potential = {}, realm } = basePool;
    const ele = ['ice', 'mine', 'wind', 'water', 'fire'];
    Object.keys(base).forEach((key) => {
      attr[key] += base[key];
    })
    Object.keys(potential).forEach((key) => {
      if (key === 'atk' || key === 'dfs') {
        attr[`${key}_max`] += potential[key];
        attr[`${key}_min`] += potential[key];
        return;
      }
      if (key === 'life' || key === 'mana') {
        attr[`${key}_max`] += potential[key];
        return;
      }
      attr[key] += potential[key];
    })
    if (realm) {
      ele.forEach((key) => {
        attr[`${key}_atk_max`] += realm;
        attr[`${key}_atk_min`] += realm;
        attr[`${key}_dfs_max`] += realm;
        attr[`${key}_dfs_min`] += realm;
      })
    }

  },
  // 计算角色buff
  computeRoleBuff: function (req, attr, buffPool, update) {
    const { pellet = {}, vip = {}, } = buffPool;
    const expireple = Object.keys(pellet);
    const expireVip = Object.keys(vip);
    // 战斗buff
    expireple.forEach((key) => {
      const { end, value } = pellet[key];
      // 判断buff是否过期,过期直接跳过,并且删除
      if (end < new Date() * 1) {
        delete pellet[key];
        return;
      }
      if (key === 'atk' || key === 'dfs') {
        attr[`${key}_max`] += value;
        attr[`${key}_min`] += value;
        return;
      }
      if (key === 'life' || key === 'mana') {
        attr[`${key}_max`] += value;
        // attr[key] += value;
        return;
      }
      attr[key] += value;
    })
    // 月卡，经验，金钱 buff
    expireVip.forEach(key => {
      // 判断buff是否过期,过期直接跳过,并且删除
      if (vip[key]['end'] < new Date() * 1) {
        delete vip[key];
        return;
      }
    })
    // 有buff过其,执行更新
    if ((Object.keys(pellet).length !== expireple.length || Object.keys(vip).length !== expireVip.length) && !update) {
      this.updateRoleInfo(req, {
        buff_pool: {
          pellet,
          vip
        }
      })
    }

    return {
      ...vip,
      ...pellet
    };
  },
  // 获取背包信息
  getKnapsack: function (req) {
    const { role, user } = Global.getknapsackGlobal(req);
    return new Promise(res => {
      mysql.sqlQuery(
        `select * from knapsack  where user_id="${user}" and role_id="${role.id}"`,
        results => {
          return res(results[0]);
        }
      );
    });
  },
  // 更新背包
  updateKnapsack: function (req, data) {
    const { role, user } = Global.getUserRole(req);
    const upData = [];
    Object.keys(data).forEach(key => {
      upData.push(`${key}='${data[key]}'`)
    })
    return new Promise(res => {
      mysql.sqlQuery(
        `update knapsack  SET ${upData.join(',')}  where user_id="${user}" and role_id="${role.id}"`,
        results => {
          return res(results);
        }
      );
    });
  },
  // 升级经验
  computeUpLevel: function (level) {
    switch (parseInt(level / 10)) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        return 10 * parseInt(level / 10) * 100 * (level % 10 + 1);
      case 5:
      case 6:
        return 10000000 + (level % 10 + 1) * 5000000;
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
    let { role_level, role_exp, role_realm, role_career, base_pool } = roleInfo;
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
      upExp = this.computeUpLevel(role_level)
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
      base_pool.base = base;
      update['base_pool'] = JSON.stringify(base_pool);
    }
    Global.updateRoleGlobal(req, update);

  }
};
