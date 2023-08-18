const { ElementTable, GrandTable } = require('../../../table');
module.exports = {
    /**
     * 地图任务元素解析
     * @param {*} grand
     * @param {*} type
     * @param {*} id
     * @returns grand
     */
    getGrand: function (grand, type, id, isCan) {
        const { npc, tNpc, freak = [] } = grand;
        if (npc) {
            const { name } = ElementTable.getElement(npc.id);
            npc.name = name;
            npc.taskType = type;
            npc.taskId = id;
            npc.path = '/taskScene';
            npc.dir = npc.id;
            npc.repeat = tNpc && npc.id === tNpc.id && npc.address === tNpc.address;
            npc.addressName = GrandTable.getGrandName(npc.address);
        }
        if (tNpc) {
            const { name } = ElementTable.getElement(tNpc.id);
            tNpc.name = name;
            tNpc.taskType = type;
            tNpc.taskId = id;
            tNpc.path = '/taskScene';
            tNpc.dir = tNpc.id;
            tNpc.isCan = isCan;
            tNpc.repeat = npc.id === tNpc.id && npc.address === tNpc.address;
            tNpc.addressName = GrandTable.getGrandName(npc.address);
        }
        grand.freak = freak.map((itme) => {
            const { name, ext } = ElementTable.getElement(itme.id);
            return {
                ...itme,
                name,
                taskType: type,
                taskId: id,
                addressName: GrandTable.getGrandName(itme.address),
                ext: {
                    ...ext,
                    num: itme.num || 1
                }
            }
        })
    }
}

