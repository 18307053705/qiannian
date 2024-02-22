const { TIAN_BANG_Global } = require('./config');
module.exports = {
    /**
     * 计算排名信息
     */
    getRank: function (type) {
        const ranks = TIAN_BANG_Global[type];
        return {
            ranks,
            open: TIAN_BANG_Global.open
        }
    }


}