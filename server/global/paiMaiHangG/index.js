
const getPaimaiHang = require('./getPaimaiHang');
const setPaimaiHang = require('./setPaimaiHang');
const updataPaimaiHang = require('./updataPaimaiHang');
const getPaimaiAll = require('./getPaimaiAll');
module.exports = {
    ...getPaimaiHang,
    ...setPaimaiHang,
    ...updataPaimaiHang,
    ...getPaimaiAll
}