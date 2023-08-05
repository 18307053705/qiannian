/**
 * 全局角色指令信息数据结构
 */
const GRAND_Global = {
    // role_id: { 
    //   name: {}, 地图名称
    //   eleList 元素信息
    //   eleDir:{} 指令信息
    //   moveDir:{} 移动指令
    //   address: 坐标
    //   currentDir:当前指令信息,如战斗对手信息,任务信息等
    // }
}

/**
 * 全局地图元素
 */
const GRAND_ELE_Global = {
    // address: { 
    //   articleEle: [], 物品元素{id,s,p,time(过期时间)}
    //   taskEle: [], 任务元素暂不实现
    // }
    // 示例
    // "10001,0,0": {
    //     articleEle: [
    //         {
    //             id: 1,
    //             p: 3,
    //             s: 1,
    //             time: 1691224691
    //         },
    //         {
    //             id: 2,
    //             p: 3,
    //             s: 1,
    //             time: 1691219639
    //         },
    //     ]
    // }
}

module.exports = {
    GRAND_Global,
    GRAND_ELE_Global
}