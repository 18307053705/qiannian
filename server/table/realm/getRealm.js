const realmMeun = require('./realmMeun');
module.exports = {
    /**
     * 
     * @param {number} realmId 境界
     * @returns {*} realm 境界信息{ 
            id: 1,
            name: '凡', 境界名称
            attr: 1, 属性加成
            ele: 100, 元素属性
            potential: 5 潜力
        }
     */
    getRealm: function (realmId) {
        const data = realmMeun[realmId];
        return data ? JSON.parse(JSON.stringify(data)) : undefined
    }
}