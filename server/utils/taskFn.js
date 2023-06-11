const Global = require('../global');
const mysql = require('../mysql');
const roleFn = require('./roleFn');
const taskTable = require('../table/task');
const knapsackFn = require('./knapsackFn');
const DAILY_TASK_KEY = ['exp', 'tael', 'world', 'exploit'];
const REWARD_MEUN = {
  tael: '银两',
  exp: '经验',
  exploit: '世界功勋',
  world: '世界声望',
}
module.exports = {
  // 重置任务池
  restTask: function () {
    Global.taskLoop = {};
  },
  // 初始化任务池
  initTask: async function (role_id, roleInfo) {
    const taskLoop = JSON.parse(roleInfo.task_pool);
    const level = roleInfo.role_level;
    let exploitNum = 0;
    let taskNum = 8;
    if (level > 65) {
      exploitNum = 8;
      taskNum = 12;
    }
    if (level > 74) {
      exploitNum = 10;
      taskNum = 15;
    }
    const tael = new Array(taskNum);
    const world = new Array(taskNum);
    const exp = new Array(taskNum);

    const tasks = {};
    Object.keys(taskLoop).forEach((type) => {
      tasks[type] = taskLoop[type].map((id) => this.createTask({ type, id }))
    })

    Global.taskLoop = {
      [role_id]: {
        ...tasks,
        exp,
        tael,
        world,
      }
    };
    // 判断是否拥有功勋任务
    if (exploitNum) {
      Global.taskLoop[role_id]['exploit'] = new Array(exploitNum);
    }
  },
  // 创建任务
  createTask: function ({ req, type, id }) {
    // 每日任务
    if (DAILY_TASK_KEY.includes(type)) {
      const user = req.cookies["q_uid"];
      const { level } = Global.roleLoop[user];
      const id_s = Math.floor(Math.random() * 2) + 1;
      // 深拷贝
      const task = JSON.parse(JSON.stringify(taskTable['daily'][id_s]));
      let reward = {};
      if (type === 'exp') {
        let exp = this.getTaskExp(level);
        reward = {
          role: {
            role_exp: exp
          },
          text: `经验x${exp}`
        }
      }
      if (type === 'tael') {
        reward = {
          knapsack: {
            tael: level * 1000,
          },
          text: `银两x${level * 1000}`
        }
      }
      if (type === 'exploit' || type === 'world') {
        reward = {
          role: {
            reputation_pool: {
              [type]: 100
            }
          },
          text: `${REWARD_MEUN[type]}x100`
        }
      }
      task['reward'] = reward;
      return task;
    }
    // 主线任务
    if (type === 'main') {
      const task = JSON.parse(JSON.stringify(taskTable['main'][id]));
      const reward = { role: {}, knapsack: {} };
      const taskReward = task['reward'];
      const text = [];
      Object.keys(taskReward).forEach((key) => {
        let rewardItme = taskReward[key];
        if (key === 'exp') {
          reward['role']['role_exp'] = rewardItme;
          text.push(`经验x${rewardItme}`);
          return;
        }
        if (key === 'tael') {
          reward['knapsack']['tael'] = rewardItme;
          text.push(`银两x${rewardItme}`);
          return;
        }
        if (key === 'exploit' || key === 'world') {
          reward['role']['reputation_pool'] = {
            [key]: rewardItme
          }
          text.push(`${REWARD_MEUN[key]}x${rewardItme}`);
          return;
        }
        if (key === 'article') {
          reward['knapsack']['article'] = {}
          const artReward = {};
          const equipReward = {};
          rewardItme.forEach(({ id, type, n, name, num = 1 }) => {
            text.push(`${name || n}x${num || 1}`);
            if (type === 3) {
              equipReward[id] = { id, n: name, p: type, s: num, ext: '0_0_0_0_0_0_0' }
            } else {
              artReward[id] = { id, n, p: type, s: num };
            }
          });
          if (JSON.stringify(artReward) !== '{}') {
            reward['knapsack']['article']['artReward'] = artReward;
          }
          if (JSON.stringify(equipReward) !== '{}') {
            reward['knapsack']['article']['equipReward'] = equipReward;
          }

        }
      })
      if (JSON.stringify(reward['role']) === '{}') {
        delete reward['role'];
      }
      if (JSON.stringify(reward['knapsack']) === '{}') {
        delete reward['knapsack'];
      }
      task['reward'] = {
        ...reward,
        text: text.join(',')
      }
      return task;

    }
  },
  // 监听任务池
  listenTask(req, eleId, num) {
    const { role } = Global.getUserRole(req);
    const tasks = Global.taskLoop[role.id];
    const taskText = [];
    Object.keys(tasks).forEach(key => {
      tasks[key].forEach((itme) => {
        // 每日任务,每做完一个在重新生
        if (!itme) {
          return;
        }
        let task = undefined;
        // 主线任务
        if (key === 'main') {
          task = taskTable['main'][itme.id]['group'][itme.in_x];
        }

        // 每日任务
        if (key === 'exp' || key === 'tael' || key === 'world' || key === 'exploit') {
          task = taskTable['daily'][itme.id];
        }
        // 判断是否存在战斗条件
        if (task['complete'] && task['complete']['fight']) {
          if (!itme.fight) { itme.fight = JSON.parse(JSON.stringify(task['complete']['fight'])) };
          itme.fight.forEach((ele) => {
            if (ele['id'] === eleId) {
              ele['domeNum'] = ele['domeNum'] ? ele['domeNum'] + num : num;
              ele['domeNum'] > ele['num'] && (ele['domeNum'] = ele['num']);
              taskText.push(`【${task['title']}】:${ele['name']}(${ele['domeNum']}/${ele['num']})`)
            }
          })
        }
      })
    })
    return taskText;
  },
  // 任务进度
  speedTask: function (complete, task, data) {
    const speed = [];
    // 默认完成
    let done = true;
    // 判断是否存在战斗条
    if (complete['fight']) {
      const fight = task.fight || complete['fight'];
      fight.forEach(({ name, num, domeNum = 0 }) => {
        // 判断需要击杀的怪物是否满足
        if (domeNum < num) { done = false };
        speed.push(`${name}(${domeNum || 0}/${num})`)
      })
    }
    // 判断是否存在物品条件
    if (complete['article']) {
      complete['article'].forEach(({ id, p, num }) => {
        const length = data.length;
        const info = { n: '', s: 0 }
        for (let i = 0; i < length; i++) {
          if (data[i]['id'] === id && data[i]['p'] === p) {
            info.n = data[i]['n'];
            info.s += data[i]['s']
          }
          if (info.s >= num) {
            i = length;
          }
        }
        // 循环结束,判断是否有未收集物品
        if (info.s < num) {
          done = false;
        }
        speed.push(`${info.n}(${info.s}/${num})`)
      })
    }

    return {
      text: speed.join(','),
      state: done
    };
  },
  // 计算每日任务经验
  getTaskExp: function (level) {
    let exp = roleFn.computeUpLevel(level);
    switch (parseInt(level / 10)) {
      case 0:
      case 1:
      case 2:
        return parseInt(exp * 0.5);
      case 3:
      case 4:
        return parseInt(exp * 0.2);
      case 5:
      case 6:
        return parseInt(exp * 0.1);
      case 7:
        return parseInt(exp * 0.05);
      case 8:
        return parseInt(exp * 0.02);
      case 9:
        return parseInt(exp * 0.01);
      default:
        return parseInt(exp * 0.002);
    }
  },

  // 获取地图临时任务元素
  // type main主线 copy:副本 支线:branch 目前只有主线有临时npc和怪物，后续考虑支线与副本
  grandTask: function (req, address) {
    const { role } = Global.getUserRole(req);
    const tasks = Global.taskLoop[role.id]['mian'];
    const ele = [];
    tasks.forEach((task) => {
      const taskInfo = taskTable['main'][task.id];
      console.log(taskInfo)
    })



  }
};
