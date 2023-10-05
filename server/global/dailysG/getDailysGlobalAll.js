const { DAILYS_Global } = require('./config');

module.exports = {
    getDailysGlobalAll: function () {
        return JSON.parse(JSON.stringify(DAILYS_Global));
    }
}