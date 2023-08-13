const getDailysGlobal = require('./getDailysGlobal');
const updataDailysGlobal = require('./updataDailysGlobal');
const initDailysGlobal = require('./initDailysGlobal');


module.exports = {
    ...getDailysGlobal,
    ...updataDailysGlobal,
    ...initDailysGlobal,
}