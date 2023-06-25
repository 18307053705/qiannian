const { ERR_MEUN, error } = require("../utils/errorFn");
const roleG = require("./roleG");
const grandG = require("./grandG");
const knapsackG = require("./knapsackG");
const fightG = require("./fightG");
const socializeG = require("./socializeG");
const chatG = require("./chatG");
const petG = require("./petG");
module.exports = {
  ...roleG,
  ...grandG,
  ...knapsackG,
  ...fightG,
  ...socializeG,
  ...chatG,
  ...petG,
  // 任务池,判断角色任务池
  taskLoop: {
    // main 
    // key：角色id { main:[{id:1,in_x:0}],branch:[],money:[], world:[],chance:[],exploit:[]}
  },
  // 可接任务池
  canTaskPool: {},
  // 临时聊天缓存
};

