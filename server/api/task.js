const express = require("express");
const router = new express.Router();
const Global = require('../global')
const taskTable = require('../table/task');
const knapsackTable = require('../table/knapsack');
const knapsackFn = require('../utils/knapsackFn');
const taskFn = require('../utils/taskFn');
const roleFn = require('../utils/roleFn');
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

router.post("/getTaskList", (req, res) => {
    const { role } = Global.getUserRole(req);
    const task = Global.taskLoop[role.id];
    const taskList = Object.keys(task).map(key => {
        return {
            text: `${TASK_MEUN[key]}(${task[key].length})`,
            type: key
        }
    })
    res.send({
        code: 0,
        data: taskList,
        task,
    })
});


const dailyTaskKey = ['exp', 'tael', 'world', 'exploit'];

router.post("/getTaskDetail", async (req, res) => {
    const { role } = Global.getUserRole(req);
    const { type } = req.body;
    const tasks = Global.taskLoop[role.id][type];
    if (tasks && tasks.length) {
        const { data } = await knapsackFn.getKnapsackInfo(req, 1);
        // 判断是否为每日任务
        if (dailyTaskKey.includes(type)) {
            const task = tasks[0] ? tasks[0] : (tasks[0] = taskFn.createTask({ req, type }));
            const { text } = taskFn.speedTask(task['complete'], task, data);
            res.send({
                code: 0,
                data: [{
                    title: task['title'],
                    tips: task['tips'],
                    reward: task.reward['text'],
                    speed: text,
                    type,
                }],
            })
            return;
        }
        if (type === 'main') {
            const taskList = tasks.map((task) => ({
                title: task['title'],
                tips: task['tips'],
                reward: task.reward['text'],
                speed: taskFn.speedTask(task['complete'], task, data)['text'],
                type,
            }));
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
    const { role } = Global.getUserRole(req);
    const tasks = Global.taskLoop[role.id][type];

    if (tasks && tasks.length) {
        let { data, tael: oldTael } = await knapsackFn.getKnapsackInfo(req, 1);
        const task = dailyTaskKey.includes(type) ? tasks[0] : tasks[in_x];
        const speed = taskFn.speedTask(task['complete'], task, data);
         // 判断任务是否完成
         if (!speed['state']) {
            res.send({
                code: 0,
                message: '任务未完成',
            })
            return;
        }
        const { reward } = task;
        if (reward['knapsack']) {
            const { tael, article } = reward['knapsack'];
            if (tael) {
                oldTael += tael;
            }
            if (article) {
                const len = data.length;
                const { artReward, equipReward } = article;
                // 物品奖励
                if (artReward) {
                    for (let index = 0; index < len; index++) {
                        const { p, id, s } = data[index];
                        // 判断物品id与物品类型是否相同
                        if (artReward[id] && artReward[id].p == p) {
                            const { s: num } = artReward[id];
                            // 找到对应id,判断是否可以继续叠加
                            if (s + num <= knapsackTable.Maxs) {
                                data[index]['s'] += num;
                                delete artReward[id];
                            } else {
                                artReward[id]['num2'] = data[index]['s'] + num - knapsackTable.Maxs;
                                data[index]['s'] = knapsackTable.Maxs;
                            }
                        }
                        // 全部处理完,结束循环
                        if (JSON.stringify(artReward) === '{}') {
                            index = knapsackTable.size;
                        }
                    }
                    //  遍历结束还存在物品奖励，说明物品为新增
                    Object.keys(artReward).forEach(key => {
                        const { id, type, n, s, num2 } = artReward[key];
                        data.push({ id, n, p: type, s: num2 || s });
                        delete artReward[key];
                    })
                }
                // 装备奖励
                if (equipReward) {
                    Object.keys(equipReward).forEach(key => {
                        data.push(equipReward[key]);
                        delete equipReward[key];
                    })
                }
            }
            if (data.length > knapsackTable.size) {
                res.send({
                    code: 0,
                    message: '背包已满,请先清理背包',
                    data: { data, oldTael }
                })
                return;
            }

        }
        roleFn.updateKnapsack(req,{tael:oldTael,data:JSON.stringify(data)});
        if (reward['role']) {
            const { role_exp = 0, reputation_pool={} } = reward['role'];
            roleFn.computeRoleLevel(req, res, role_exp, (role, updata) => {
                const requtation = JSON.parse(role.reputation_pool);
                Object.keys(reputation_pool).forEach((key)=>{
                    requtation[key] =  requtation[key] ? requtation[key] + reputation_pool[key] : reputation_pool[key];
                })
                updata['reputation_pool'] = JSON.stringify(requtation);
            })
        }
        res.send({
            code: 0,
            data: '',
        })
        return;
    }

    res.send({
        code: 0,
        data: ''
    })
});

module.exports = router;
