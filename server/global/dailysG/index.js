const getDailysGlobal = require('./getDailysGlobal');
const updataDailysGlobal = require('./updataDailysGlobal');
const initDailysGlobal = require('./initDailysGlobal');
const getDailysGlobalAll = require('./getDailysGlobalAll');


module.exports = {
    ...getDailysGlobal,
    ...updataDailysGlobal,
    ...initDailysGlobal,
    ...getDailysGlobalAll
}