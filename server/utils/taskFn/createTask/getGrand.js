const { ElementTable } = require('../../../table');
module.exports = {
    /**
     * 地图任务元素解析
     * @param {*} grand
     * @returns grand
     */
    getGrand: function (grand) {
        const { npc, tNpc, freak } = grand;
        if (npc) {
            const { name } = ElementTable.getElement(npc.id);
            npc.name = name;
            npc.taskType = type;
            npc.dir = id;
            npc.path = '/taskScene';
        }
        if (tNpc) {
            const { name } = ElementTable.getElement(tNpc.id);
            tNpc.name = name;
            tNpc.taskType = type;
            tNpc.dir = id;
            tNpc.path = '/taskScene';
        }
        if (freak) {
            const { name } = ElementTable.getElement(freak.id);
            freak.name = name;
            freak.taskType = type;
            freak.dir = freak.id;
            freak.path = '/fight';
        }

    }
}

