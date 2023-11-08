const { TaskG } = require('../../global');
const { speedTask } = require('./speedTask');
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
            const noCopy = TASK_TYPE_MEUN.copy != type;
            if (tasks) {
                Object.values(tasks).forEach(({ grand, complete, status, title, id, }) => {
                    if (status === 3) {
                        TaskG.deleteTaskGlobal(req, res, type, id);
                        return;
                    }
                    const { npc, freak = [], tNpc } = grand;
                    // 未接任务
                    if (status === 0 && noCopy) {
                        if (npc.address === address) {
                            // 加入指令列表
                            eleDir[npc.id] = npc;
                            // 加入元素列表
                            npcEle.push({ name: npc.name, cs: 'g_sigh', dir: npc.id })
                        }
                    }
                    const ele = tNpc || npc;

                    if (status === 1 && ele.address === address && noCopy) {
                        const { done } = freak.length ? speedTask(req, res, { complete, grand }) : { done: true };
                        if (done) {
                            // 加入指令列表
                            eleDir[ele.id] = ele;
                            // 加入元素列表
                            npcEle.push({ name: ele.name, cs: 'g_doubt', dir: ele.id });
                        }

                    }
                    if (status === 2 && ele.address === address && noCopy) {
                        // 加入指令列表
                        eleDir[ele.id] = ele;
                        // 加入元素列表
                        npcEle.push({ name: ele.name, cs: 'g_doubt', dir: ele.id });
                    }
                    if (status === 1) {
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
