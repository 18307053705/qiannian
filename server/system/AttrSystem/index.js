const enums = require('./0library/enum');
const library = require('./0library');
const utils = require('./utils');
module.exports = {
    /**
     * 枚举信息
     */
    ...enums,
    ...utils,
    getRoleBaseAttr: library.getRoleBaseAttr
}
