const { ELEMENT_1 } = require('./ELEMENT_1');
const { ELEMENT_2 } = require('./ELEMENT_2');
const { ELEMENT_3 } = require('./ELEMENT_3');
const { ELEMENT_4 } = require('./ELEMENT_4');



module.exports = {
    /**
     * 获取元素信息
     * @param {*} eleId 元素id(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
     * @returns {*} eleInfo 对应元素信息 || undefined
     */
    getElement: function (eleId) {
        const eleType = Math.floor(eleId / 1000000);
        let eleMap = undefined;
        if (eleType === 1) {
            eleMap = ELEMENT_1;
        }
        if (eleType === 2) {
            eleMap = ELEMENT_2;
        }
        if (eleType === 3) {
            eleMap = ELEMENT_3;
        }
        if (eleType === 4) {
            eleMap = ELEMENT_4;
        }
        return eleMap[eleId] ? JSON.parse(JSON.stringify(eleMap[eleId])) : {};
    },
    /**
     * 获取元素组信息(开头id必须一致)
     * @param {*} startId 开始元素id(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
     * @param {*} startId 到结束元素id(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
     * @returns {*} 对应元素信息([eleInfo,eleInfo]) || []
     */
    getElementList: function (startId, endId) {
        const eleList = [];
        const eleType = Math.floor(startId / 1000000);
        let eleMap = undefined;
        if (eleType === 1) {
            eleMap = ELEMENT_1;
        }
        if (eleType === 2) {
            eleMap = ELEMENT_2;
        }
        if (eleType === 3) {
            eleMap = ELEMENT_3;
        }
        if (eleType === 4) {
            eleMap = ELEMENT_4;
        }

        for (start = startId; start <= endId; start++) {
            eleList.push(eleMap[start])
        }


        return JSON.parse(JSON.stringify(eleList));
    }
}