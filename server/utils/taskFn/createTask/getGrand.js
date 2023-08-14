const { ElementTable,GrandTable } = require('../../../table');
module.exports = {
    /**
     * 地图任务元素解析
     * @param {*} grand
     * @param {*} type
     * @param {*} id
     * @returns grand
     */
    getGrand: function (grand, type, id) {
        const { npc, tNpc, freak } = grand;
        if (npc) {
            const { name } = ElementTable.getElement(npc.id);
            npc.name = name;
            npc.taskType = type;
            npc.dir = id;
            npc.path = '/taskScene';
            npc.addressName = GrandTable.getGrandName(npc.address);
        }
        if (tNpc) {
            const { name } = ElementTable.getElement(tNpc.id);
            tNpc.name = name;
            tNpc.taskType = type;
            tNpc.dir = id;
            tNpc.path = '/taskScene';
            tNpc.addressName = GrandTable.getGrandName(npc.address);
        }
        if (freak) {
            const { name } = ElementTable.getElement(freak.id);
            freak.name = name;
            freak.taskType = type;
            freak.dir = freak.id;
            freak.path = '/fight';
            freak.addressName = GrandTable.getGrandName(npc.address);
        }

    }
}

