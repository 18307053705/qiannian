const { CAI_LIN_DONG } = require('./config');

module.exports = {
    /**
     * 设置彩铃洞
     */
    openCaiLingDong: function () {
        const { create } = CAI_LIN_DONG;
        // 已创建，避免重复创建
        if (create) {
            return;
        }
        CAI_LIN_DONG.create = true;
        CAI_LIN_DONG.ids =  {};
        CAI_LIN_DONG.done = [];
        CAI_LIN_DONG.rank = {};
    }
}