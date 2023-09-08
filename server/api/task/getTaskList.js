const { TaskG, DailysG } = require('../../global');
const { taskFn } = require('../../utils');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_MEUN } = TaskG;
// * @returns dailys.lianHunDong 30级炼魂洞副本
// * @returns dailys.heiJiaoYu 40级黑角域副本
// * @returns dailys.siHailongGong 50级四海龙宫副本
// * @returns dailys.fengHuangTongMu 60级凤凰桐木副本
// * @returns dailys.moShenChuanShuo 70级魔神传说副本
// * @returns dailys.haiDiMoGong 80级海底魔宫副本
// * @returns dailys.tinaMoYiZhi 90级天魔遗址副本
// * @returns dailys.diFuChuanShuo 100级地府传说副本
// * @returns dailys.qunMoLuanWu 100级群魔乱舞副本
// * @returns dailys.tianMoJIangLin 100级天魔降临副本
const COPY_KEY = [
    'lianHunDong',
    'heiJiaoYu',
    'siHailongGong',
    'fengHuangTongMu',
    'moShenChuanShuo',
    'haiDiMoGong',
    'tinaMoYiZhi',
    'diFuChuanShuo',
    'qunMoLuanWu',
    'tianMoJIangLin',
]
module.exports = {
    /**
     * 获取任务列表
     * @param {*} req.type 任务类型默认main(mian:主线,exp:每日经验,tael:每日金钱,world:每日声望)
     */
    getTaskList: function (req, res) {
        const { type = TASK_TYPE_MEUN.main } = req.body;
        const { tasks, message } = taskFn.getTasksInfo(req, res, type);
        const daitys = DailysG.getDailysGlobal(req, res);
        const mains = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {};
        // const mainLen = Object.values(mains).length;
        const taskList = [{
            text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.main]}(${Object.values(mains).length})`,
            type: TASK_TYPE_MEUN.main
        }];
        Object.keys(daitys).forEach((key) => {
            // 判断是否为副本
            const text = TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN[key] || -1]
            if (text && daitys[key] !== -1) {
                taskList.push({
                    text: `${text}(${daitys[key]})`,
                    type: TASK_TYPE_MEUN[key]
                })
            }
        })
        const copys = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        const copyLen = Object.values(copys).filter(({ status }) => status).length;
        if (copyLen) {
            taskList.push({
                text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.copy]}(${copyLen})`,
                type: TASK_TYPE_MEUN.copy
            })
        }
        res.send({
            code: 0,
            message,
            data: {
                taskList,
                task: tasks,
                DAIL_TYPE_LIST
            },
        })

    }
}