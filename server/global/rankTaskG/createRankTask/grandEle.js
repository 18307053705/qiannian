const { getElement } = require('@/table/element');
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
            return {
                ...itme,
                ...getElement(itme.id),
                c: 0,
                s: itme.num || 1,
                role: []
            }
        })
    }
}

