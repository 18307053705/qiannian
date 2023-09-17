const { SHNEYUAN_FREAK_ID } = require('./config');
const getShenYuan = require('./getShenYuan');
const getShenYuanRank = require('./getShenYuanRank');
const updateShenYuan = require('./updateShenYuan');
const setShenYuan = require('./setShenYuan');
module.exports = {
    SHNEYUAN_FREAK_ID,
    ...getShenYuan,
    ...getShenYuanRank,
    ...updateShenYuan,
    ...setShenYuan,
}