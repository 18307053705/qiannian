
const computeTerrLevel = require('./computeTerrLevel');
const terrAttr = require('./terrAttr');

module.exports = {
   ...computeTerrLevel,
   ...terrAttr
}
