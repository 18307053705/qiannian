const asyncGetShopInfo = require('./asyncGetShopInfo');
const asyncUpdataShopInfo = require('./asyncUpdataShopInfo');

module.exports = {
    ...asyncGetShopInfo,
    ...asyncUpdataShopInfo
}