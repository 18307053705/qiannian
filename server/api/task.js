const express = require("express");
const router = new express.Router();
const Global = require('../global')
const knapsackFn = require('../utils/knapsackFn');
const taskFn = require('../utils/taskFn');
const roleFn = require('../utils/roleFn');
const dirFn = require('../utils/dirFn');
const taskTable = require('../table/task');
const TASK_MEUN = {
    main: '主线任务',
    branch: '支线任务',
    exp: '每日经验',
    tael: '每日金钱',
    world: '每日声望',
    exploit: '每日功勋',
    chance: '奇遇任务',
    copy: '副本任务',
}

const DAILY_TASK_KEY = taskFn.DAILY_TASK_KEY;

router.post("/getTaskList", (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const task = Global.taskLoop[role_id];
    const taskList = Object.keys(task).map(key => {
        return {
            text: `${TASK_MEUN[key]}(${task[key].length})`,
            type: key
        }
    })
    res.send({
        code: 0,
        data: taskList
    })
});


router.post("/getTaskDetail", async (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const { type } = req.body;
    const tasks = Global.taskLoop[role_id][type];
    if (tasks && tasks.length) {
        const { data } = await knapsackFn.getKnapsackInfo(req, 1);
        // 判断是否为每日任务
        if (DAILY_TASK_KEY.includes(type)) {
            const task = tasks[0] ? tasks[0] : (tasks[0] = taskFn.createTask({ req, type }));
            const { state, text } = taskFn.speedTask(task['complete'], task, data);
            res.send({
                code: 0,
                data: [{
                    title: task['title'],
                    tips: task['tips'],
                    reward: task.reward['text'],
                    speed: text,
                    type,
                    btn: state ? '领取奖励' : ''
                }],
            })
            return;
        }
        if (type === 'main') {
            const taskList = tasks.map((task) => {
                const { grand } = task;
                // 没有条件代表为对话型任务
                const { state, text } = task['complete']
                    ? taskFn.speedTask(task['complete'], task, data)
                    : {
                        text: `对话${grand.targetNpc.name}(未完成)`,
                        state: false,
                    };
                return ({
                    title: task['title'],
                    tips: task['tips'],
                    reward: task.reward['text'],
                    speed: text,
                    type,
                    btn: state ? '前往领取' : ''
                })
            });
            res.send({
                code: 0,
                data: taskList
            })
            return;
        }
    }
    // 
    res.send({
        code: 0,
        data: [],
    })
    return;

});

router.post("/doneTask", async (req, res) => {
    const { in_x, type } = req.body;
    if (!(in_x !== undefined && type)) {
        res.send({
            code: 10005,
            message: '参数错误'
        })
        return;
    }
    const { role_id } = Global.getRoleGlobal(req);
    const dir = Global.getDir(req);
    const tasks = Global.taskLoop[role_id][type];
    if (type === 'main') {
        const task = tasks[in_x];
        const { npc } = task['grand'];
        if (dir['address'] !== npc['address']) {
            dirFn.tpDir(npc['address'], req, res);
        } else {
            res.send({
                code: 0,
                data: {}
            });
        }
        return;
    }
    if (DAILY_TASK_KEY.includes(type) && tasks[0]) {
        const data = await taskFn.getTaskReward(req, res, tasks[0]);
        // 每日任务逻辑
        if (!data) {
            Global.taskLoop[role.id][type].splice(0, 1);
            res.send({
                code: 0,
                data: '领取奖励成功'
            });
            return;
        }
        res.send(data);
    };
});

// 获取任务剧情
router.post("/getTaskStory", async (req, res) => {
    // return;
    const { role_id, can_task_pool, task_pool } = Global.getRoleGlobal(req);
    // 获取指令池,npc对应任务信息
    const { extDir } = Global.getDir(req);
    if (extDir) {
        const { taskType, taskId, activation } = extDir;
        const backInfo = {
            taskId,
            state: 0
        };
        // 判断是否接取该任务,是则获取对应奖励
        if (activation) {
            const task = Global.taskLoop[role_id][taskType].find(({ id }) => id === taskId);
            if (task) {
                // 返回信息
                const result = await taskFn.getTaskReward(req, res, task, (roleInfo, updata) => {
                    // 已领取任务信息处理
                    task_pool[taskType] = task_pool[taskType].filter((id) => (id !== taskId));
                    updata['task_pool'] = task_pool;
                    Global.taskLoop[role_id][taskType] = Global.taskLoop[role_id][taskType].filter(({ id }) => (id !== taskId));
                    // 可领取任务处理
                    if (task['nextTask'] !== -1) {
                        // 下一环任务加入可领取列表
                        can_task_pool[taskType].push(task['nextTask']);
                        updata['can_task_pool'] = can_task_pool;
                        Global.canTaskPool[role_id][taskType].push(task['nextTask']);
                        // 判断下一环任务是否还是当前npc
                        const { npc } = taskTable[taskType][task['nextTask']]['grand'];
                        if (extDir['address'] === npc['address'] && npc['id'] === extDir.id) {
                            // 是则更改npc指令信息
                            // 前端操作展示：继续, 返回任务id
                            Global.setDir(req, { extDir: { ...extDir, activation: false, taskId: task['nextTask'] } });
                            backInfo['taskId'] = taskId;
                        } else {
                            // 否 返回传送npc信息：坐标，名字
                            // 前端操作展示：点击传送
                            backInfo['tpNpc'] = {
                                address: npc['address'],
                                name: npc['name'],
                            }
                        }

                    }
                });
                backInfo['reward'] = task['reward']['text'];
                backInfo['state'] = result ? 2 : 1;
                res.send(({
                    code: 0,
                    data: {
                        ...backInfo,
                        message: result && result.message
                    },
                }))
                return;
            }

        } else {
            // 否则领取任务
            const task = Global.canTaskPool[role_id][taskType].find((id) => id === taskId);
            if (task) {
                can_task_pool[taskType] = can_task_pool[taskType].filter((id) => (taskId !== id));
                task_pool[taskType].push(taskId);
                // 更新全局任务信息
                Global.canTaskPool[role_id] = can_task_pool;
                const taskInfo = taskFn.createTask({ req, type: taskType, id: taskId });
                Global.taskLoop[role_id][taskType].push(taskInfo);
                const { freak, targetNpc } = taskInfo['grand'];
                backInfo['tpNpc'] = {
                    address: freak ? freak[0]['address'] : targetNpc['address'],
                    name: freak ? freak[0]['name'] : targetNpc['name'],
                }
                // 更新数据库任务信息
                const updata = {
                    can_task_pool,
                    task_pool,
                }
                roleFn.updateRoleInfo(req, updata);
                res.send({
                    code: 0,
                    data: backInfo,
                })
                return;
            }

        }
    }
    res.send({
        code: 10005,
        message: '任务信息异常'
    })
});



router.post("/taskNpc", (req, res) => {
    const { address } = req.body;
    if (!address) {
        res.send({
            code: 10005,
            message: '参数错误'
        })
        return;
    }
    const { extDir } = Global.getDir(req);
    if (extDir['address'] !== address) {
        dirFn.tpDir(address, req, res);
        return;
    }
    res.send({
        code: 0,
        data: ''
    })
});


module.exports = router;
