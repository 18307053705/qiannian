const { TIAN_BANG_Global } = require('./config');
module.exports = {
    /**
     * 设置已领取id
     * @param {*} type 类型
     * @param {*} index 下标(排名)
     * @param {*} roleId 角色id 情缘需使用
     * @returns 
     */
    setRank: function (type, index, roleId) {
        const ranks = TIAN_BANG_Global[type];
        // 情缘
        if (type === 100) {
            ranks[index]['ok'].push(roleId)
        } else {
            ranks[index]['ok'] = 1;
        }
        TIAN_BANG_Global[type] = ranks;
    }


}