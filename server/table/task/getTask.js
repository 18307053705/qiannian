const { RoleG } = require('../../global');
const peopleMian = require('./peopleMian');

const TASK_TYPE_MEUN = {
    main: 'main',
    exp: 'exp',
    tael: 'tael',
    world: 'world',
};
module.exports = {
    /**
     * 任务类型枚举
     * mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     */
    TASK_TYPE_MEUN,
    /**
     * 获取任务信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @param {*} id 
     * @returns id id
     * @returns title 标题
     * @returns type 类型 1:战斗,2:对话,3:收集,4:猜拳,5:选择
     * @returns tips 述述
     * @returns level 等级,可选
     * @returns reward 任务奖励
     * @returns reward.article id-s,多个物品使用,分隔
     * @returns reward.equip id-s,多个装备使用,分隔
     * @returns reward.tael 银两奖励tael:100
     * @returns reward.attr 属性奖励('经验:exp-1000,声望:world-100,帮会声望:gang-100,结义声望:intersect-100,功勋:exploit-100')
     * @returns grand 地图信息
     * @returns grand.npc 领取任务npc{address,id}
     * @returns grand.tNpc 目标npc{address,id}(对话型任务)
     * @returns grand.freak 目标怪物[{address,id,s:次数}](战斗型任务)
     * @returns neck 领任务文案[]
     * @returns done 完成任务文案[]
     * @returns complete 完成条件
     * @returns complete.article 完物品需求id-s,多个物品使用,分隔
     * @returns complete.equip 装备需求id-s,多个装备使用,分隔
     * @returns complete.freak 怪物击杀需求id-s多个怪物使用,分隔
     * @returns nextTask 下一个任务id
     */
    getTask: function (req, res, type, id) {
        const { role_race } = RoleG.getRoleGlobal(req, res);
        if (type === TASK_TYPE_MEUN.main && role_race === 1) {
            return peopleMian[id] ? JSON.parse(JSON.stringify(peopleMian[id])) : undefined;
        }

    },
}