const { peopleGrand } = require('./people');
const { goblinGrand } = require('./goblin');
const { immortalGrand } = require('./immortal');
const { neutralityGrand } = require('./neutrality');
const { copyGrand } = require('./copy');
const { differenceGrand } = require('./difference');
module.exports = {
    /**
     * 获取地图名称
     * @param {string} address 地图坐标
     * @returns {*} name
     */
    getGrandName: function (address) {
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
        const { data } = grand;
        let name = undefined;
        if (data[strX] && data[strX][strY]) {
            const { n } = data[strX][strY];
            name = n;
        }
        return name || grand.name;
    }
};