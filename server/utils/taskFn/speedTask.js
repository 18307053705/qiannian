const { chekeKnapsack } = require('../knapsackFn/chekeKnapsack');
const { GrandG } = require('@/global');
const { TaskSystem } = require('@/system');
const { TASK_TYPE } = TaskSystem;
module.exports = {
    /**
     * 获取任务进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} task 
     * @returns done true 完成
     * @returns exist 当前物品信息
     * @returns fight 当前杀怪信息
     */
    speedTask: function (req, res, task) {
        // 完成条件 freak{id,n,s,c} article{id,p,n,s}
        const { complete = {}, grand, type, action } = task;
        // 对话任务 
        if (TASK_TYPE.duihau === type) {
            const { currentDir } = GrandG.getDirGlobal(req, res);
            const { npc, tNpc } = grand;
            // 判断目标NPC是否为当前npc，是则完成任务
            const taskNpc = tNpc || npc;
            return { done: currentDir.id === taskNpc.id && currentDir.address === taskNpc.address };
        }
        const { freak, article, migong, done } = complete;
        // 战斗任务
        if (TASK_TYPE.zhandou === type) {
            const done = Object.values(freak).find(({ s, c }) => s > c)
            return { done: !Boolean(done), freak };
        }
        // 收集任务
        if (TASK_TYPE.shouji === type) {
            const { exist, result } = chekeKnapsack(req, res, article);
            return { done: result, article: exist };
        }
        // 宝箱任务与迷宫 已完成 无需重新计算
        if ((TASK_TYPE.biaoxiang === type || TASK_TYPE.migong === type) && done) {
            return complete;
        }
        // 宝箱任务?
        if (TASK_TYPE.biaoxiang === type) {
            const done = Math.floor(Math.random() * (action.num || 9)) + 1 === 1;
            return { done, text: done ? '' : '选错了,重新选一个了吧!' };
        }
        // 迷宫任务
        if (TASK_TYPE.migong === type) {
            const reat = Math.floor(Math.random() * 7);
            
            const { num } = action;
            let { s, c } = migong || { s: num, c: 0 };
            if (s === c) {
                return { done: true, migong: { s, c } };
            }
            if (reat > 2) {
                c++;
                return { done: s === c, migong: { s, c }, text: `恭喜你走对了，还差${s - c}步.` };
            }
            return { done: false, migong: { s: num, c: 0, }, text: '一步走错请重新再来吧.' };
        }
        return complete;
    }
}