const Global = require('../global');
const mysql = require('../mysql');
const roleFn = require('./roleFn');
const taskTable = require('../table/task');

module.exports = {
  // 重置任务池
  restTack: function () {
    Global.taskLoop = {};
  },
  // 初始化任务池
  initTack: async function (role_id, roleInfo) {
    const taskLoop = JSON.parse(roleInfo.task_pool);
    const money = [];
    const world = [];
    for (let i = 1; i < 9; i++) {
      money.push(Math.floor(Math.random() * 2) + 1);
      world.push(Math.floor(Math.random() * 2) + 1);
    }
    Global.taskLoop = {
      [role_id]: {
        ...taskLoop,
        money,
        world
      }
    };
  },
  // 监听任务池
  listenTask(req, eleId, num) {
    const { role } = Global.getUserRole(req);
    const tasks = Global.taskLoop[role.id];
    Object.keys(tasks).forEach(key => {
      tasks[key].forEach((itme) => {
        let fight = undefined;
        // 主线任务
        if (key === 'main') {
          fight = taskTable['main'][itme.id][itme.in_x]['complete'];
        }
        // 每日任务
        if (key === 'money' || key === 'world') {
          fight = taskTable['daily'][itme.id]['complete'];
        }
        // 判断是否存在战斗条件
        if (fight) {
          (itme.fight || (itme.fight = JSON.parse(JSON.stringify(fight)))).forEach((ele) => {
            if (ele['id'] === eleId) {
              ele.domeNum = ele.domeNum ? ele.domeNum + num : num;
              ele.domeNum > ele.num && (ele.domeNum = ele.num);
            }
          })
        }

      })
    })
    console.log(tasks, 'tasks...');
  },
  doneTack: function (req) {
    return cryptoFn.decrypt(enPass, "pass_user", "pass_IP");
  },
  // 任务奖励
  // type 1:物品 2:银两 3:经验 4:声望
  rewardTack: function (reward) {

  },

};


var a = [{ b: 1, c: { e: 1 } }]
JSON.stringify(a)
b = JSON.parse(JSON.stringify(a));
b[0].b = 2;
