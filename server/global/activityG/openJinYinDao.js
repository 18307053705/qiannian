const { JIN_YIN_DAO } = require('./config');

module.exports = {
    /**
     * 设置金银岛
     */
    openJinYinDao: function () {
        const { create } = JIN_YIN_DAO;
        // 已创建，避免重复创建
        if (create) {
            return;
        }
        JIN_YIN_DAO.create = true;
        JIN_YIN_DAO.ids = {};
        JIN_YIN_DAO.done = [];
        JIN_YIN_DAO.rank = {};
    }
}