const { TaskG } = require('../../global');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {

    grandTaskEle: function (req, res, address, eleList, eleDir) {
        const tasks = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {};
        const canTasks = TaskG.getCanTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {};
        const npcEle = [];
        Object.values(tasks).forEach(({ grand }) => {
            const { npc, freak = [], tNpc = {} } = grand;
            if (npc.address === address) {
                // 加入指令列表
                eleDir[npc.id] = npc;
                // 加入元素列表
                npcEle.push({ name: npc.name, cs: 'g_doubt', dir: npc.dir })
            }
            if (tNpc.address === address) {
                // 加入指令列表
                eleDir[tNpc.id] = tNpc;
                // 加入元素列表
                npcEle.push({ name: tNpc.name, cs: 'g_doubt', dir: tNpc.dir })
            }
            freak.forEach(({ id, s = 1, c = 0, ...itme }) => {
                if (itme.address === address && s > c) {
                    // 加入指令列表
                    dirList[id] = { id, s, c, ...itme };
                    // 加入元素列表
                    npcEle.push({ name: itme.name, cs: 'g_doubt', dir: itme.dir })
                }
            })

        })
        Object.values(canTasks).forEach((grand) => {
            const { npc } = grand;
            if (npc.address === address) {
                // 加入指令列表
                eleDir[npc.id] = npc;
                // 加入元素列表
                npcEle.push({ name: npc.name, cs: 'g_sigh', dir: npc.dir })
            }

        })
        npcEle.length && eleList.push(npcEle);
    },
}
