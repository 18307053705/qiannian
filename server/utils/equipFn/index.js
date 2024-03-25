const wearEquip = require('./wearEquip');
const getEquipInfo = require('./getEquipInfo');
const computeEquipAttr = require('./computeEquipAttr');
const getMakeInfo = require('./getMakeInfo');
const computeSuitAttr = require('./computeSuitAttr');
const computeEquipPosKey = require('./computeEquipPosKey');
const commputeEqipAttrRole = require('./commputeEqipAttrRole');


module.exports = {
    ...wearEquip,
    ...getEquipInfo,
    ...computeEquipAttr,
    ...getMakeInfo,
    ...computeSuitAttr,
    ...computeEquipPosKey,
    ...commputeEqipAttrRole
}