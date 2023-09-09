const terrAttr = require('./terrAttr');
const getQingyuanInfo = require('./getQingyuanInfo');
const updataQingyuanInfo = require('./updataQingyuanInfo');
const deleteQingYuan = require('./deleteQingYuan');
const insertQingYuan = require('./insertQingYuan');

module.exports = {
    ...terrAttr,
    ...getQingyuanInfo,
    ...updataQingyuanInfo,
    ...deleteQingYuan,
    ...insertQingYuan
}