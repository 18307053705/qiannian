const { ERR_MEUN, error } = require("../utils/errorFn");
module.exports = {
  grandDir: {
    dir: {
      // user_id_role_id: {
      //   moveDir: [],
      //   eleDir: {}
      //   extDir:{} 元素面板扩展信息，比如怪物元素：怪物id，npc元素：剧情ID，建筑元素：活动ID，背包ID，仓库ID等..
      //   dirDisable:false
      // }
    },
    get: function (req, getDisable) {
      const _this = module.exports;
      const { role } = _this.getUserRole(req);
      const dir = _this["grandDir"]["dir"][role.id];
      return (!dir && !getDisable) ? { error: ERR_MEUN.ROLE } : dir;
    },
    set: function (req, dir) {
      const _this = module.exports;
      const { role } = _this.getUserRole(req);
      _this["grandDir"]["dir"][role.id] = dir;
    }
  },
  // 战斗池
  fightLoop: {
    fightRoleId: {
      // 角色id 存在战斗池id role_id:1 对应fightMap[id]
    },
    fightMap: {
      // 战斗池信息 {id,type,rival,player,contact }
      // id: 战斗池信息id
      // type 战斗类型: 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
      // rival 对方信息 [] 
      // player 我方信息[] {}
      // buffs buff信息
      // extDir 敌人原型信息
    },
  },
  // 角色池,判断角色是否在线
  roleLoop: {
    // key：账号 { id:role,name:name }
  },
  getUserRole: function (req) {
    const user = req.cookies["q_uid"];
    if (this.roleLoop[user]) {
      return { user, role: this.roleLoop[user] };
    }
    return undefined;
  },
  // 更新角色访问时间
  updateRoleTime: function (req) {
    const user = req.cookies["q_uid"];
    if (this.roleLoop[user]) {
      this.roleLoop[user]['time'] = new Date() * 1;
    } else {
      return true;
    }
  },
  // 任务池,判断角色任务池
  taskLoop: {
    // main 
    // key：角色id { main:[{id:1,in_x:0}],branch:[],money:[], world:[],chance:[],exploit:[]}
  },
  // 临时聊天缓存
};

