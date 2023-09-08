const { ELEMENT_1 } = require('./ELEMENT_1');
const { ELEMENT_2 } = require('./ELEMENT_2');
const { ELEMENT_3 } = require('./ELEMENT_3');
const { ELEMENT_4 } = require('./ELEMENT_4');

// id: 2000000,
// name: "持刀山贼",
// type: 2,
// ext: {
//   career: 1,
//   level: 1,
//   attr: 0.5,
//   pet: true,
// },
// article: '1-1,2-1-50',
// equip: '1',

module.exports = {
    /**
     * 获取元素信息
     * @param {*} eleId 元素id(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
     * @returns {*} ele 对应元素信息 || {}
     * @returns {*} ele.id
     * @returns {*} ele.name
     * @returns {*} ele.type 元素类型1:NPC元素,2:怪物元素,3:传送元素,4:面板元素
     * @returns {*} ele.ext 扩展信息(怪物元素)
     * @returns {*} ele.article 掉落物品信息(怪物元素)
     * @returns {*} ele.equip 掉落装备信息(怪物元素)
     * @returns {*} ele.dir 传送地址
     * @returns {*} ele.path 跳转链接
     */
    getElement: function (eleId) {
        const eleType = (eleId + "")[0];
        let eleMap = undefined;
        if (eleType === '1') {
            eleMap = ELEMENT_1;
        }
        if (eleType === '2') {
            eleMap = ELEMENT_2;
        }
        if (eleType === '3') {
            eleMap = ELEMENT_3;
        }
        if (eleType === '4') {
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
        let eleMap = undefined;
        const eleType = (startId + "")[0];
        if (eleType === '1') {
            eleMap = ELEMENT_1;
        }
        if (eleType === '2') {
            eleMap = ELEMENT_2;
        }
        if (eleType === '3') {
            eleMap = ELEMENT_3;
        }
        if (eleType === '4') {
            eleMap = ELEMENT_4;
        }

        for (start = startId; start <= endId; start++) {
            eleList.push(eleMap[start])
        }


        return JSON.parse(JSON.stringify(eleList));
    }
}