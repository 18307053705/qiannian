const FIGHT_TYPE_EUNM = {
    pve: 1, // 单人人机
    rank: 2, // 组队人机
    duel: 3,  // 玩家切磋
    kill: 4 // 玩家死斗
}
const FIGHT_STATE_EUNM = {
    inCombat: 0, // 战斗中
    victory: 1, // 胜利
    fail: 2, // 失败
}


/**
 * 战斗信息
 */
const FIGHT_INFO_Global = {
   
}
/**
 * 组队战斗信息，用与玩家共享
 */
const FIGHT_RANK_INFO_Global = {
    // id:{
    //      rivals: 对方信息 [] 
    //      players: 我方信息 [] 
    //      buffs: buff信息
    //  }
}




module.exports = {
    FIGHT_RANK_INFO_Global,
    FIGHT_INFO_Global,
    FIGHT_TYPE_EUNM,
    FIGHT_STATE_EUNM
}