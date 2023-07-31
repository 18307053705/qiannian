/**
 * 战斗ID池
 */
const FIGHT_MAP_Global = {
    // role_id:{
    //          id:战斗池信息id
    //          state:战斗状态(0:战斗中,1:胜利,2:失败)
    //          type:战斗类型(1:玩家VS人机,2:玩家VS玩家,3:多玩家VS玩家人机)
    //          rivalMold:敌人原型信息
    //          results: 战斗结果(奖励信息)
    // }
}
/**
 * 战斗池信息池
 */
const FIGHT_INFO_Global = {
    // id:{
    //      rivals: 对方信息 [] 
    //      players: 我方信息 [] 
    //      buffs: buff信息
    //  }
}


module.exports = {
    FIGHT_MAP_Global,
    FIGHT_INFO_Global,
}