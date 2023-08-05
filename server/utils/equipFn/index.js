const wearEquip = require('./wearEquip');
const getEquipInfo = require('./getEquipInfo');
const computeEquipAttr = require('./computeEquipAttr');


module.exports = {
    ...wearEquip,
    ...getEquipInfo,
    ...computeEquipAttr
}