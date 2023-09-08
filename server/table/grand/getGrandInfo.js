const { peopleGrand } = require('./people');
const { goblinGrand } = require('./goblin');
const { immortalGrand } = require('./immortal');
const { neutralityGrand } = require('./neutrality');
const { copyGrand } = require('./copy');
const { differenceGrand } = require('./difference');
module.exports = {
    /**
     * 获取地图元素信息
     * @param {string} address 地图坐标
     * @returns {*} grand地图信息{id,name,data:地图元素二维数组}
     * @returns {number} x x坐标
     * @returns {number} y y坐标
     */
    getGrandInfo: function (address) {
        // if(id < 20000)
        const [id, strX, strY] = address.split(",");
        const grandId = id[0];
        let grand = undefined;
        if (grandId === '1') {
            grand = peopleGrand[id];
        }
        if (grandId === '2') {
            grand = goblinGrand[id];
        }
        if (grandId === '3') {
            grand = immortalGrand[id];
        }
        if (grandId === '4') {
            grand = neutralityGrand[id];
        }
        if (grandId === '5') {
            grand = copyGrand[id];
        }
        if (grandId === '6') {
            grand = differenceGrand[id];
        }
        if (!grand) {
            return undefined;
        }
        return {
            grand,
            x: Number(strX),
            y: Number(strY)
        }
    }
};