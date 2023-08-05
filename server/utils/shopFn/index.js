const getShopInfo = require('./getShopInfo');
const updataShopInfo = require('./updataShopInfo');

module.exports = {
    ...getShopInfo,
    ...updataShopInfo
}