const { CAI_LIN_DONG } = require('./config');
const { asyncQuery } = require('../../mysql');

function setRankRole(sociId, num) {
    asyncQuery(`select * from socialize  where soci_id="${sociId}" and type=3`).then(({ results }) => {
        if (results[0]) {
            JSON.parse(results[0]['compose']).forEach(({ id }) => {
                CAI_LIN_DONG.ids[id] = num;
            })
        }
    })
}
module.exports = {
    /**
     * 关闭彩灵洞
     */
    closeCaiLingDong: function () {
        CAI_LIN_DONG.create = false;
        const list = Object.values(CAI_LIN_DONG.rank).sort((pre, next) => {
            if (pre.v === next.v) {
                return pre.s - next.s;
            }
            return next.v - pre.v;
        })
        const [one, two, three] = list;
        // 排名第一帮会
        if (one) {
            setRankRole(one.id, 1);
        }
        // 排名第二帮会
        if (two) {
            setRankRole(two.id, 2);
        }
        // 排名第三帮会
        if (three) {
            setRankRole(three.id, 3);
        }

    }
}