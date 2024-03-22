const mian = require('./10mian');
const copy = require('./11copy');
const daily = require('./12daily');
const enums = require('./enum');

const task = {
    ...mian,
    ...copy,
    ...daily
}

module.exports = {
    ...enums,
    /**
     * 获取任务信息
     * @param {*} id
     * @returns id id
     * @returns title 标题
     * @returns tips 述述
     * @returns level 等级,可选
     * @returns reward 任务奖励
     * @returns grand 地图信息
     * @returns grand.npc 领取任务npc{address,id}
     * @returns grand.tNpc 目标npc{address,id}(对话型任务)
     * @returns grand.freak 目标怪物[{address,id,s:次数}](战斗型任务)
     * @returns neck 领任务文案[]
     * @returns done 完成任务文案[]
     * @returns complete 完成条件
     * @returns complete.article 完物品需求id-s,多个物品使用,分隔
     * @returns complete.freak 怪物击杀需求id-s多个怪物使用,分隔
     * @returns nextTask 下一个任务id
     */
    getTask: function (id) {
        if (task[id]) {
            return JSON.parse(JSON.stringify({
                ...task[id],
                id,
            }))
        }
        console.log('异常任务ID：', id)
        return undefined;
    },
    getCopyTackAll: function () {
        return JSON.parse(JSON.stringify(copy));
    },
    randomDailyTaskId: function (level) {
        const ids = Object.keys(daily).filter((id) => {
            const task = daily[id];
            return task.level < level;
        });
        return ids[Math.floor(Math.random() * ids.length)];
    },
}