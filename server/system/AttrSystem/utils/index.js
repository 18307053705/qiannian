const computeRoleAttr = require('./computeRoleAttr');
const computeFreakAttr = require('./computeFreakAttr');
const computePetAttr = require('./computePetAttr');
const computeUpExp = require('./computeUpExp');


module.exports = {
    ...computeRoleAttr,
    ...computeFreakAttr,
    ...computePetAttr,
    ...computeUpExp
}
