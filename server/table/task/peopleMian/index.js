const chuZhang = require('./chuZhang');
const daJiangJun = require('./daJiangJun');
const yiQIZhiDi = require('./yiQIZhiDi');
// 角色名称模版
// replace: true,
// "你当即上去问道：在下${role_name},请问这位姑娘可知道何处有灵异小妖?",
//  id id
//  title 标题
//  type 类型 1:战斗,2:对话,3:收集,4:猜拳,5:选择
//  tips 述述
//  level 等级,可选
//  reward 任务奖励
//  reward.article id-s,多个物品使用,分隔
//  reward.equip id-s,多个装备使用,分隔
//  reward.tael 银两奖励tael:100
//  reward.yuanbao 元宝奖励yuanbao:100
//  reward.attr 属性奖励('经验:exp-1000,声望:world-100,帮会声望:gang-100,结义声望:intersect-100,功勋:exploit-100')
//  grand 地图信息
//  grand.npc 领取任务npc{address,id}
//  grand.tNpc 目标npc{address,id}(对话型任务)
//  grand.freak 目标怪物[{address,id,s:次数}](战斗型任务)
//  receive 领任务文案[]
//  done 完成任务文案[]
//  complete 完成条件
//  complete.article 完物品需求id-s,多个物品使用,分隔
//  complete.equip 装备需求id-s,多个装备使用,分隔
//  complete.freak 怪物击杀需求id-s多个怪物使用,分隔
//  nextTask 下一个任务id
module.exports = {
    ...chuZhang,
    ...daJiangJun,
    ...yiQIZhiDi
}


