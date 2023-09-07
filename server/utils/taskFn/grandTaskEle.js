const { TaskG } = require('../../global');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {
    grandTaskEle: function (req, res, address, eleList, eleDir) {
        const tasksMap = {
            [TASK_TYPE_MEUN.main]: TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main),
            [TASK_TYPE_MEUN.copy]: TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy)
        };
        const npcEle = [];
        Object.keys(tasksMap).forEach((type) => {
            const tasks = tasksMap[type];
            if (tasks) {
                Object.values(tasks).forEach(({ grand, complete, status, title, id }) => {
                    if (status === 3) {
                        TaskG.deleteTaskGlobal(req, res, type, id);
                        return;
                    }
                    const { npc, freak = [], tNpc = {} } = grand;
                    if (npc.address === address) {
                        // 加入指令列表
                        eleDir[npc.id] = npc;
                        // 加入元素列表
                        npcEle.push({ name: npc.name, cs: status === 0 ? 'g_sigh' : 'g_doubt', dir: npc.id })
                    }
                    // 必须已领取的任务才存在目标NPC及目标怪物
                    if (status) {
                        if (tNpc.address === address) {
                            // 判断接取任务的npc与交付的npc是否同一人,避免出现重复
                            // 加入指令列表
                            eleDir[tNpc.id] = tNpc;
                            if (!tNpc.repeat) {
                                // 加入元素列表
                                npcEle.push({ name: tNpc.name, cs: 'g_doubt', dir: tNpc.id });
                            }
                        }
                        freak.forEach(({ id, ...itme }) => {
                            const { s = 1, c = 0 } = complete['freak'][id];
                            if (!complete['freak'][id]) {
                                console.log('grandTaskEle-错误怪物ID:', id, '任务title:', title)
                            }
                            if (itme.address === address && s > c) {
                                // 加入指令列表
                                eleDir[id] = { ...itme, id, s, c, path: '/fight', dir: id };
                                // 加入元素列表
                                npcEle.push({ name: itme.name, cs: 'g_doubt', dir: id })
                            }
                        })
                    }


                })
            }
        })
        npcEle.length && eleList.push(npcEle);
    },
}
