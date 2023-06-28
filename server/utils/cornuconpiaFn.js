const knapsackTable = require("../table/knapsack");

const materialIds = {
    ice: [213, 214, 215],
    mine: [210, 211, 212],
    wind: [207, 208, 209],
    water: [216, 217, 218],
    fire: [219, 220, 221],
}

const MATERIAL_ID_MEUN = {};
Object.keys(materialIds).forEach(key => {
    materialIds[key].forEach((id) => {
        MATERIAL_ID_MEUN[id] = {
            ...knapsackTable[id],
            key
        };
    })
})

// 聚宝道具奖励池
const propsMap = {
    // 一级奖励池一级与二级勋章，房屋，令牌，徽标
    1: [192, 193, 197, 198, 202, 203, 303, 304],
    // 二级奖励池1-3级勋章，房屋，令牌，徽标
    2: [192, 193, 194, 197, 198, 199, 202, 203, 204, 303, 304, 305],
    // 三级奖励池3-5级勋章，房屋，令牌，徽标，灵血丸，双倍经验卡，双倍银两卡
    3: [194, 195, 196, 199, 200, 201, 204, 205, 206, 305, 306, 307, 308, 34, 36, 39],
    // 四级奖励池包含三级奖池全部物品,增加三倍经验卡，三倍银两卡，世界声望卷轴，帮会声望卷轴，结义,声望卷轴
    4: [194, 195, 196, 199, 200, 201, 204, 205, 206, 305, 306, 307, 308, 34, 36, 39, 42, 43, 44],
    // 五级奖池包含四级奖池全部物品,增加世界功勋卷轴与大灵血丸
    5: [194, 195, 196, 199, 200, 201, 204, 205, 206, 305, 306, 307, 308, 34, 36, 39, 42, 43, 44, 45, 35],
    // 六级奖池包含五级奖池全部物品,减少3级勋章，房屋，令牌，徽标，增加宠物技能卷，宠物进化卷,宠物扩房卷,宠物转化卷
    6: [195, 196, 200, 201, 205, 206, 306, 307, 308, 34, 36, 39, 42, 43, 44, 45, 35, 158, 159, 161, 162],
    // 七级奖池包含六级奖池全部物品,增加1-3级强化卡
    7: [195, 196, 200, 201, 205, 206, 306, 307, 308, 34, 36, 39, 42, 43, 44, 45, 35, 158, 159, 161, 162, 90, 91, 92],
    // 八级奖池包含七级奖池全部物品,减少4级勋章，房屋，令牌，徽标，新增五倍经验卡与五倍银两卡  
    8: [196, 201, 206, 307, 308, 34, 36, 39, 42, 43, 44, 45, 35, 158, 159, 161, 162, 90, 91, 92, 38, 41],
    // 九级奖池包含八级奖池全部物品，增加4-5级强化卡
    9: [196, 201, 206, 307, 308, 34, 36, 39, 42, 43, 44, 45, 35, 158, 159, 161, 162, 90, 91, 92, 38, 41, 93, 94],
}
module.exports = {
    MATERIAL_ID_MEUN,
    getPrize: function (jbp) {
        const { id: jbpId, lx } = jbp;
        // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
        // 最大30级
        const level = lx / 3;

        let rowid = 0;
        let rate = Math.floor(Math.random() * (100 - 0));
        // 1-2级奖池
        if (level < 5) {
            rowid = (rate + level * 5) > 50 ? 2 : 1;
        }
        // 1-4级奖池
        if (level < 10 && rowid === 0) {
            // 每级增加4级奖池的1%概率
            rate = rate + level * 1;
            rate < 10 && (rowid = 1);
            rate < 60 && (rowid = 2);
            rate < 90 && (rowid = 3);
            rate >= 90 && (rowid = 4);
        }
        // 2-6级奖池
        if (level < 15 && rowid === 0) {
            // 每级增加6级奖池的1%概率
            rate = rate + level * 1;
            rate < 10 && (rowid = 2);
            rate < 70 && (rowid = 3);
            rate < 80 && (rowid = 4);
            rate < 99 && (rowid = 5);
            rate >= 99 && (rowid = 6);
        }
        // 3-8级奖池
        if (level < 20 && rowid === 0) {
            // 每级增加8级奖池的0.5%概率
            rate = rate + level * 1;
            rate < 30 && (rowid = 3);
            rate < 70 && (rowid = 4);
            rate < 80 && (rowid = 5);
            rate < 90 && (rowid = 6);
            rate < 99 && (rowid = 7);
            rate >= 99 && (rowid = 8);
        }
        // 4-9级奖池
        if (level < 30 && rowid === 0) {
            // 每级增加9级奖池的0.5%概率
            rate = rate + level * 1;
            rate < 30 && (rowid = 4);
            rate < 70 && (rowid = 5);
            rate < 80 && (rowid = 6);
            rate < 90 && (rowid = 7);
            rate < 99 && (rowid = 8);
            rate >= 99 && (rowid = 9);
        }
        // 9级概率增加
        if (level === 30 && rowid === 0) {
            // 每级增加9级奖池的1%概率
            rate = rate + level;
            rate < 30 && (rowid = 4);
            rate < 70 && (rowid = 5);
            rate < 80 && (rowid = 6);
            rate < 90 && (rowid = 7);
            rate < 99 && (rowid = 8);
            rate >= 99 && (rowid = 9);
        }
        const len = propsMap[rowid].length;
        let id = jbpId;
        do {
            const index = Math.floor(Math.random() * (len - 0));
            id = propsMap[rowid][index];
        } while (id == jbpId)

        return knapsackTable[id];
    },
    gatherRate: function (jbp) {
        const { id, lx } = jbp;
        // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
        const level = lx / 3;
        let rowid = 0;
        // propsMap
        Object.values(propsMap).forEach((ids, index) => {
            rowid = ids.includes(id) ? index + 1 : rowid;
        })
        let rate = Math.floor(Math.random() * (100 - 0));
        // 每级成功概率+1%
        // 物品id所在最高奖池每级的成功率-10%
        return rate - level < 99 - rowid * 10;
    }
}