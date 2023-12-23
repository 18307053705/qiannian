
/**
 * 全局背包信息数据结构
 */
const KNAPSACK_Global = {
    // key: { // 角色id为key
    //     ...knapsack,
    //     updateKeys: [] // 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    // }
}
module.exports = {
    KNAPSACK_Global,
    EQUIP_INIT_EXT: '0_0_0_0_0_0_0_0_0',
    KNAPSACK_SIZE: 200,
    KNAPSACK_LIMIT: 999999,
}