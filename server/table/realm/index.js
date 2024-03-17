const getrealm = require('./getRealm');
const getRealmMeun = require('./getRealmMeun');
const getLeiJie = require('./getLeiJie');
module.exports = {
    ...getrealm,
    ...getRealmMeun,
    ...getLeiJie
}