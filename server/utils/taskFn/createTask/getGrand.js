const { ElementTable, GrandTable } = require('../../../table');
module.exports = {
    /**
     * 地图任务元素解析
     * @param {*} grand
     * @param {*} type
     * @param {*} id
     * @returns grand
     */
    getGrand: function (grand, type, id) {
        const { npc, tNpc, freak = [] } = grand;
        if (npc) {
            const { name } = ElementTable.getElement(npc.id);
            npc.name = name;
            npc.taskType = type;
            npc.taskId = id;
            npc.path = '/taskScene';
            npc.dir = npc.id;
            npc.addressName = GrandTable.getGrandName(npc.address);
        }
        if (tNpc) {
            const { name } = ElementTable.getElement(tNpc.id);
            tNpc.name = name;
            tNpc.taskType = type;
            tNpc.taskId = id;
            tNpc.path = '/taskScene';
            tNpc.dir = tNpc.id;
            tNpc.addressName = GrandTable.getGrandName(npc.address);
        }
        grand.freak = freak.map((itme) => {
            const { name, ext } = ElementTable.getElement(itme.id);
            return {
                ...itme,
                taskId: itme.id,
                taskType: itme.type,
                addressName: GrandTable.getGrandName(itme.address),
                name,
                ext: {
                    ...ext,
                    num: itme.num || 1
                }
            }
        })
    }
}

