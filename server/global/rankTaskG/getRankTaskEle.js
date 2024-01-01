const { ADDRESS_LIST } = require('./config');
const { getRankTaskAll } = require('./getRankTaskAll');

module.exports = {
    /**
    * @param {*} req 
    * @param {*} res 
    * @param {*} address 坐标
    * @param {*} eleList 元素列表
    * @param {*} eleDir 元素指令
    */
    getRankTaskEle: function (req, res, adr, eleList, eleDir) {
        // 判断是否为多人副本地图
        if (!ADDRESS_LIST.includes(adr.split(',')[0])) {
            return;
        }
        const npcEle = [];
        Object.values(getRankTaskAll(req, res)).forEach(tasks => {
            Object.values(tasks || {}).forEach(({ freak, status }) => {
                // 未接状态不显示元素
                if (!status) {
                    return;
                }
                freak.forEach(({ address, id, s, c, ...itme }) => {
                    if (adr === address && s > c) {
                        // 加入指令列表
                        eleDir[id] = { ...itme, id, s, c, path: '/fight', dir: id };
                        // 加入元素列表
                        npcEle.push({ name: itme.name, cs: 'g_doubt', dir: id })
                    }
                })
            })
        })
        npcEle.length && eleList.push(npcEle);
    }
}