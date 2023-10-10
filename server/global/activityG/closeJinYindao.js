const { JIN_YIN_DAO } = require('./config');
const { asyncQuery } = require('../../mysql');

function setGangRole(gangId, num) {
    asyncQuery(`select * from socialize  where soci_id="${gangId}" and type=3`).then(({ results }) => {
        if (results[0]) {
            JSON.parse(results[0]['compose']).forEach(({ id }) => {
                JIN_YIN_DAO.ids[id] = num;
            })
        }
    })
}

module.exports = {
    /**
     * 关闭金银岛
     */
    closeJinYindao: function () {
        JIN_YIN_DAO.create = false;
        const list = Object.values(JIN_YIN_DAO.rank).sort((pre, next) => {
            if (pre.v === next.v) {
                return pre.s - next.s;
            }
            return next.v - pre.v;
        })
        const [one, two, three] = list;
        // 排名第一帮会
        if (one) {
            setGangRole(one.id, 7);
        }
        // 排名第二帮会
        if (two) {
            setGangRole(two.id, 5);
        }
        // 排名第三帮会
        if (three) {
            setGangRole(three.id, 3);
        }
    }
}