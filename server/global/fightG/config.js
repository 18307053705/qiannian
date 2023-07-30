/**
 * 战斗ID池
 */
const FIGHT_ID_Global = {
    // role_id:1  key为角色id,value为战斗池信息池id
}
/**
 * 战斗池信息池
 */
const FIGHT_INFO_Global = {
    // id:{
    //      id: 战斗池信息id
    //      type:  1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
    //      rival: 对方信息 [] 
    //      player: 我方信息 [] 
    //      buffs: buff信息
    //      rivalMold: 敌人原型信息
    //  }
}


module.exports = {
    FIGHT_ID_Global,
    FIGHT_INFO_Global,
}