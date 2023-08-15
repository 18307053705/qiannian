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
                eleDir[npc.id] = { ...npc, path: '/taskScene', dir: npc.id, isCan: false };
                // 加入元素列表
                npcEle.push({ name: npc.name, cs: 'g_doubt', dir: npc.id })
            }
            if (tNpc.address === address) {
                // 加入指令列表
                eleDir[tNpc.id] = { ...tNpc, path: '/taskScene', dir: tNpc.id, isCan: false };
                // 判断接取任务的npc与交付的npc是否同一人,避免出现重复
                if (!eleDir[tNpc.id]) {
                    // 加入元素列表
                    npcEle.push({ name: tNpc.name, cs: 'g_doubt', dir: tNpc.id });
                }

            }
            freak.forEach(({ id, s = 1, c = 0, ...itme }) => {
                if (itme.address === address && s > c) {
                    // 加入指令列表
                    dirList[id] = { ...itme, id, s, c, path: '/fight', dir: id };
                    // 加入元素列表
                    npcEle.push({ name: itme.name, cs: 'g_doubt', dir: id })
                }
            })

        })
        Object.values(canTasks).forEach((grand) => {
            const { npc } = grand;
            if (npc.address === address) {
                // 加入指令列表
                eleDir[npc.id] = { ...npc, path: '/taskScene', dir: npc.id, isCan: true };
                // 加入元素列表
                npcEle.push({ name: npc.name, cs: 'g_sigh', dir: npc.id })
            }
        })
        npcEle.length && eleList.push(npcEle);
    },
}
