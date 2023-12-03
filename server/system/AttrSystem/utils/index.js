const computeRoleAttr = require('./computeRoleAttr');
const computeFreakAttr = require('./computeFreakAttr');
const computePetAttr = require('./computePetAttr');


module.exports = {
    ...computeRoleAttr,
    ...computeFreakAttr,
    ...computePetAttr
}
