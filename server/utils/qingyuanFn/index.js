const terrAttr = require('./terrAttr');
const getQingyuanInfo = require('./getQingyuanInfo');
const updataQingyuanInfo = require('./updataQingyuanInfo');
const deleteQingYuan = require('./deleteQingYuan');
const insertQingYuan = require('./insertQingYuan');
const computeTerrLevel = require('./computeTerrLevel');

module.exports = {
    ...terrAttr,
    ...getQingyuanInfo,
    ...updataQingyuanInfo,
    ...deleteQingYuan,
    ...insertQingYuan,
    ...computeTerrLevel
}