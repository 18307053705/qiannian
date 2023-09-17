const { ADDRESS_LIST } = require('./config');
const { getRankTaskAll } = require('./getRankTaskAll');
const { updataRankTask } = require('./updataRankTask');
const { getDirGlobal } = require('../grandG/getDirGlobal')
module.exports = {
    /**
     * 监听任务击杀进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} freakId 怪物id
     * @param {*} num 怪物数量
     * @param {*} freakObj 杀怪信息
     */
    listenTask: function (req, res, freakId, num, freakObj) {
        const { address } = getDirGlobal(req, res);
        // 判断是否为多人副本地图
        if (address && !ADDRESS_LIST.includes(address.split(',')[0])) {
            return;
        }
        // 监听组队任务
        Object.values(getRankTaskAll(req, res)).forEach((tasks) => {
            Object.values(tasks || {}).forEach(({ freak, status, ...task }) => {
                if (!status) {
                    return;
                }
                let isUpdata = false;
                freak.forEach(({ id, s, c, name, ...itme }, index) => {
                    if (freakId === id) {
                        isUpdata = true;
                        const nums = c + num;
                        if (nums > s) {
                            freak[index]['c'] = s;

                        } else {
                            freak[index]['c'] = nums;
                        }
                        freakObj[`${id}${index}`] = {
                            s,
                            c: freak[index]['c'],
                            id,
                            title: name,
                            ...itme,
                        };
                    }
                })
                if (isUpdata) {
                    updataRankTask(req, res, {
                        freak,
                        status,
                        ...task,
                    })
                }
            })
        })
        // 监听深渊
        return freakObj;
    }
}