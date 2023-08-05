const wearEquip = require('./wearEquip');
const getEquipInfo = require('./getEquipInfo');


module.exports = {
    ...wearEquip,
    ...getEquipInfo
}