const { getElement } = require('../../../table/element');
const { getGrandName } = require('../../../table/grand/getGrandName');

module.exports = {
    /**
     * 地图任务元素解析
     * @param {*} freak
     * @returns freak.id
     * @returns freak.name
     * @returns freak.address
     * @returns freak.ext 怪物属性
     * @returns freak.c 击杀进度
     * @returns freak.s 需击杀
     * @returns freak.role 领取奖励角色id集合
     */
    grandEle: function (freak) {
        return freak.map((itme) => {
            const { name, ext } = getElement(itme.id);
            return {
                ...itme,
                // addressName: getGrandName(itme.address),
                name,
                ext: {
                    ...ext,
                    num: itme.num || 1
                },
                c: 0,
                s: itme.num || 1,
                role: []
            }
        })
    }
}

