const { getFreak } = require('../../table/element/ELEMENT_2');
const { ELEMENT_1 } = require('../../table/element/ELEMENT_1');
const { getCaiLingDong, getJinYindao } = require('../activeQueueG');

module.exports = {
    /**
     * 获取活动元素
     */
    getAcivityEle: function (req, res, address, eleList, eleDir) {
        const addressId = address.split(',')[0];
        // 判断是否为：彩灵洞
        if (addressId === '60004' && getCaiLingDong()) {
            const eleItme = [];
            // 白灵子，蓝灵子，红灵子，紫灵子
            const list = [{ id: 225, r: 30 }, { id: 226, r: 20 }, { id: 227, r: 10 }, { id: 228, r: 5 }];
            list.forEach(({ id, r }) => {
                if (eleItme.length < 3) {
                    const rate = Math.floor(Math.random() * 101);
                    if (rate <= r) {
                        const eleInfo = getFreak(id);
                        eleDir[id] = eleInfo;
                        eleItme.push({ name: eleInfo.name, dir: eleInfo.id });
                    }
                }
            })
            eleItme.length && eleList.push(eleItme);
            return;
        }
        // 判断是否为：金银岛
        if (addressId === '60005' && getJinYindao()) {
            const eleItme = [];
            // 金宝箱，银宝箱，铜宝箱
            const list = [{ id: 18, r: 5 }, { id: 19, r: 10 }, { id: 110, r: 20 }];
            list.forEach(({ id, r }) => {
                const rate = Math.floor(Math.random() * 101);
                if (rate <= r) {
                    const eleInfo = ELEMENT_1[id]
                    eleDir[id] = eleInfo;
                    eleItme.push({ name: eleInfo.name, dir: eleInfo.id });
                }
            })
            eleList.push(eleItme);
            return;
        }

    }
}