const getAttrMeun = require('./getAttrMeun');
const getRoleBaseAttr = require('./getRoleBaseAttr');
const getFreakBaseAttr = require('./getFreakBaseAttr');
const getPetBaseAttr = require('./getPetBaseAttr');
const getRoleEleBaseAttr = require('./getRoleEleBaseAttr');
const getInitAttr = require('./getInitAttr');

module.exports = {
    ...getAttrMeun,
    ...getAttrMeun,
    ...getRoleBaseAttr,
    ...getFreakBaseAttr,
    ...getPetBaseAttr,
    ...getRoleEleBaseAttr,
    ...getInitAttr
}