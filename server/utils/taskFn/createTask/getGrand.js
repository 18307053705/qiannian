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
        const { npc, tNpc, freak } = grand;
        if (npc) {
            // eleDir[npc.id] = { ...npc, path: '/taskScene', dir: npc.id, isCan: false, };
            const { name } = ElementTable.getElement(npc.id);
            npc.name = name;
            npc.taskType = type;
            npc.taskId = id;
            npc.path = '/taskScene';
            npc.dir = npc.id;
            npc.isCan = isCan;
            npc.repeat = tNpc && npc.id === tNpc.id;
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
            tNpc.repeat = npc.id === tNpc.id;
            tNpc.addressName = GrandTable.getGrandName(npc.address);
        }
        if (freak) {
            const { name } = ElementTable.getElement(freak.id);
            freak.name = name;
            freak.taskType = type;
            freak.taskId = id;
            freak.addressName = GrandTable.getGrandName(npc.address);
        }

    }
}

