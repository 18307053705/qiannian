module.exports = {
    WORLD_BOSS: {
        level: 1,
        create: false, // 是否创建
        boss: {},  // boss信息
        rank: { // 排名
            // role_id: { 角色id
            //     v: 0, 伤害
            //     s: 0 时间
            // }
        },
        done: [] // 已领奖id
    },
    JIN_YIN_DAO: {
        create: false, // 是否创建
        ids: {}, // 可领奖id
        rank: {  // 排名
            // linsuqing_1: {
            //     id: 'linsuqing_1',
            //     v: 100,
            //     s: new Date() * 1,
            //     n: '【道宗】'
            // }
        }
    },
    CAI_LIN_DONG: {
        create: false, // 是否创建
        // 活动结束计算所在队伍的成员
        ids: {
            // linsuqing_00011: 1,
            // zhouxiaobing_00011:1
        }, // 可领奖角色id
        done: [], // 已领奖id
        rank: {  //排名信息
            // "1704097787576_0001": {  // 队伍id
            //     id: '1704097787576_0001',
            //     v: 100, // 积分
            //     s: new Date() * 1, // 时间
            //     n: '对对对'
            // }
        },
    }
};
