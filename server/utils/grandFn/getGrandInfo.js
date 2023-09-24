const { GrandTable, ElementTable } = require("../../table");
const { updataRoleGlobal } = require("../../global/roleG/updataRoleGlobal");
const { getGrandEleGlobal } = require("../../global/grandG/getGrandEleGlobal");
const { getRankTaskEle } = require("../../global/rankTaskG/getRankTaskEle");
const taskFn = require('../taskFn');
const { getSpecificGrand } = require('./getSpecificGrand');

function getGrand(address) {
    const { x, y, grand } = GrandTable.getGrandInfo(address);
    const { name, data } = grand;
    const direction = [];
    if (data[x + 1] && Boolean(data[x + 1][y])) {
        const { n } = data[x + 1][y]
        direction.push({
            lable: "北",
            value: `${n || name}(${x + 2},${y + 1}) ↑`,
            dir: "u"
        });
    }
    if (Boolean(data[x][y + 1])) {
        const { n } = data[x][y + 1];
        direction.push({
            lable: "东",
            value: `${n || name}(${x + 1},${y + 2})→`,
            dir: "r"
        });
    }
    if (Boolean(data[x][y - 1])) {
        const { n } = data[x][y - 1]
        direction.push({
            lable: "西",
            value: `${n || name}(${x + 1},${y})←`,
            dir: "l"
        });
    }
    if (data[x - 1] && Boolean(data[x - 1][y])) {
        const { n } = data[x - 11][y]
        direction.push({
            lable: "南",
            value: `${n || name}(${x},${y + 1}) ↓`,
            dir: "d"
        });
    }
    return direction;
};

module.exports = {
    /**
     * 获取角色所在地图信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} address 坐标
     * @param {*} players 坐标内玩家列表
     * @requires {name:地图名称,x,y,eleLits:元素信息,eleDir:指令,movedir:可移动指令,players:坐标内玩家信息}
     */
    getGrandInfo: function (req, res, address, players) {
        const gGrandInfo = GrandTable.getGrandInfo(address);
        if (!gGrandInfo) {
            updataRoleGlobal(req, res, { address: "40000,0,0" })
        }
        const { x, y, grand } = gGrandInfo;
        const { name, data } = grand;
        const { list = [], n, tip } = data[x][y];
        const eleDir = {};
        const eleList = [];
        list.forEach(info => {
            const eleItme = [];
            info.forEach((eleId) => {
                const eleInfo = ElementTable.getElement(eleId);
                eleDir[eleInfo.id] = eleInfo;
                eleItme.push({ name: eleInfo.name, cs: eleInfo.cs, dir: eleInfo.id });
            });
            eleList.push(eleItme)
        });
        // 获取必须满足某些条件才会出现的特殊元素
        getSpecificGrand(req, res, address, eleList, eleDir)
        // 获取任务临时元素
        taskFn.grandTaskEle(req, res, address, eleList, eleDir);
        // 获取组队任务元素
        getRankTaskEle(req, res, address, eleList, eleDir);

        return {
            name: n || name,
            x: x + 1,
            y: y + 1,
            eleList,
            eleDir,
            moveDir: getGrand(address),
            players: players.map(({ role_name, role_id, zhangChang }) => ({ role_name, role_id, zhangChang })),
            tip,
            ...getGrandEleGlobal(req, res, address)
        };
    }
};
