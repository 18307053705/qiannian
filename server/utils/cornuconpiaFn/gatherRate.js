
const { ACKPOT_MEUN } = require('./config');
module.exports = {
    gatherRate: function (jbp) {
        const { id, lx } = jbp;
        // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
        const level = lx / 3;
        let rowid = 0;
        Object.values(ACKPOT_MEUN).forEach((ids, index) => {
            rowid = ids.includes(id) ? index + 1 : rowid;
        })
        let rate = Math.floor(Math.random() * (100 - 0));
        // 每级成功概率+1%
        // 物品id所在最高奖池每级的成功率-10%
        return rate - level < 99 - rowid * 10;
    }
}