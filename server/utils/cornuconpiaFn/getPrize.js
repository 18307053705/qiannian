const { knapsackTable } = require('../../table');
const { ACKPOT_MEUN } = require('./config');
module.exports = {
    /**
     * 获取聚宝奖励
     * @param {*} jbp 聚宝盆信息
     */
    getPrize: function (jbp) {
        const { id: jbpId, lx } = jbp;
        // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
        // 最大30级
        const level = lx / 3;

        let rowid = 0;
        let rate = Math.floor(Math.random() * 100);
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
        const len = ACKPOT_MEUN[rowid].length;
        let id = jbpId;
        do {
            const index = Math.floor(Math.random() * (len - 0));
            id = ACKPOT_MEUN[rowid][index];
        } while (id == jbpId)

        return knapsackTable.getArticle(id);
    },
}