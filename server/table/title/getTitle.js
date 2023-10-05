const titleMeun = require('./titleMeun');


module.exports = {
    /**
     * 
     * @param {number} titleId 境界
     * @returns {*} title 境界信息{ 
            id: 1,
            name: 称号名称
            effect: 称号效果
        }
     */
    getTitle: function (titleId) {
        return   titleMeun[titleId] ? JSON.parse(JSON.stringify(titleMeun[titleId])) : { name: '无' }
    }
}