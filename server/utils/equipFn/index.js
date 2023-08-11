const wearEquip = require('./wearEquip');
const getEquipInfo = require('./getEquipInfo');
const computeEquipAttr = require('./computeEquipAttr');
const getMakeInfo = require('./getMakeInfo');


module.exports = {
    ...wearEquip,
    ...getEquipInfo,
    ...computeEquipAttr,
    ...getMakeInfo
}