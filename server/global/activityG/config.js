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
        ids: [], // 可领奖id
        done: [], // 已领奖id
        rank: {  // 排名
            // gang_id: { 帮会id
            //     v: 0 积分
            //     s: 0 时间
            // }
        }
    },
    CAI_LIN_DONG: {
        create: false, // 是否创建
        // 活动结束计算所在队伍的成员
        ids: [], // 可领奖id
        done: [], // 已领奖id
        rank: {  //排名信息
            // rank_id: { 队伍id
            //     v: 0 积分
            //     s: 0 时间
            // }
        }
    }
};

