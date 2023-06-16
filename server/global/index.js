const { ERR_MEUN, error } = require("../utils/errorFn");
const roleG = require("./roleG");
const grandG = require("./grandG");
const knapsackG = require("./knapsackG");
const fightG = require("./fightG");
module.exports = {
  ...roleG,
  ...grandG,
  ...knapsackG,
  ...fightG,
  // 战斗池
  // fightLoop: {
  //   fightRoleId: {
  //     // 角色id 存在战斗池id role_id:1 对应fightMap[id]
  //   },
  //   fightMap: {
  //     // 战斗池信息 {id,type,rival,player,contact }
  //     // id: 战斗池信息id
  //     // type 战斗类型: 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
  //     // rival 对方信息 [] 
  //     // player 我方信息[] {}
  //     // buffs buff信息
  //     // extDir 敌人原型信息
  //   },
  // },
  // 角色池,判断角色是否在线
  // roleLoop: {
  //   // key：账号 { id:role,name:name }
  // },
  // getUserRole: function (req) {
  //   const user = req.cookies["q_uid"];
  //   if (this.roleLoop[user]) {
  //     return { user, role: this.roleLoop[user] };
  //   }
  //   return undefined;
  // },
  // 更新角色访问时间
  // updateRoleTime: function (req) {
  //   const user = req.cookies["q_uid"];
  //   if (this.roleLoop[user]) {
  //     this.roleLoop[user]['time'] = new Date() * 1;
  //   } else {
  //     return true;
  //   }
  // },
  // 任务池,判断角色任务池
  taskLoop: {
    // main 
    // key：角色id { main:[{id:1,in_x:0}],branch:[],money:[], world:[],chance:[],exploit:[]}
  },
  // 可接任务池
  canTaskPool: {},
  // 临时聊天缓存
};

