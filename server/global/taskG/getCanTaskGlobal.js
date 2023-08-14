const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { CAN_TASKS_Global } = require('./config');

module.exports = {
    /**
     * 获取全局未接任务信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @returns tasks{id:task} || undefined
     * @returns task.id
     * @returns task.title 标题
     * @returns task.type 类型 1:战斗,2:对话,3:收集,4:猜拳,5:选择
     * @returns task.tips 述述
     * @returns task.level 等级,可选
     * @returns task.reward 任务奖励
     * @returns task.reward.article {artReward,equipReward}
     * @returns task.reward.tael 银两奖励tael:100
     * @returns task.reward.role {exp:100,world:100,gang:100,intersect:100,exploit:100}
     * @returns task.grand 地图信息
     * @returns task.grand.npc 领取任务npc{address,id,name}
     * @returns task.grand.tNpc 目标npc{address,id}(对话型任务)
     * @returns task.grand.freak 目标怪物{address,id,s:次数}(战斗型任务)
     * @returns task.neck 领任务文案[]
     * @returns task.done 完成任务文案[]
     * @returns task.complete 完成条件
     * @returns task.complete.article {id:{id,n,p,s}}
     * @returns task.complete.freak {id,n,s}
     * @returns task.speed 进度
     * @returns task.speed.done 是否完成
     * @returns task.speed.exist 物品收集信息{id:{id,n,p,s,c}}
     * @returns task.speed.fight 杀过进度信息{id,n,s,c}
     * @returns task.nextTask 下一个任务id
     */
    getCanTaskGlobal: function (req, res, type) {
        const { role_id } = getRoleGlobal(req, res);
        if (CAN_TASKS_Global[role_id] && CAN_TASKS_Global[role_id][type]) {
            return JSON.parse(JSON.stringify(CAN_TASKS_Global[role_id][type]));
        }
        return undefined;
    }
}