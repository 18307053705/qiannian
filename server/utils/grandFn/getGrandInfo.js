const { GrandTable } = require("../../table");
// const { Global } = require("../../global");
// const taskFn = require('./taskFn');

function getGrand(address) {
    const { x, y, grand } = GrandTable.getGrandInfo(address);
    const { name, data } = grand;
    const direction = [];
    if (data[x + 1] && Boolean(data[x + 1][y])) {
        direction.push({
            lable: "北",
            value: `${name}(${x + 2},${y + 1}) ↑`,
            dir: "u"
        });
    }
    if (Boolean(data[x][y + 1])) {
        direction.push({
            lable: "东",
            value: `${name}(${x + 1},${y + 2})→`,
            dir: "r"
        });
    }
    if (Boolean(data[x][y - 1])) {
        direction.push({
            lable: "西",
            value: `${name}(${x + 1},${y})←`,
            dir: "l"
        });
    }
    if (data[x - 1] && Boolean(data[x - 1][y])) {
        direction.push({
            lable: "南",
            value: `${name}(${x},${y + 1}) ↓`,
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
        const { x, y, grand } = GrandTable.getGrandInfo(address);
        const { name, data } = grand;
        const grandEle = data[x][y];
        const eleDir = {};
        const eleList = [];
        grandEle.forEach(info => {
            const eleItme = [];
            info.forEach((itme) => {
                eleDir[itme.id] = itme;
                eleItme.push({ name: itme.name, cs: itme.cs, dir: itme.id });
            });
            eleList.push(eleItme)
        });

        // 获取任务临时元素
        // taskFn.grandTaskEle(req, address, ele, dirList);
        return {
            name,
            x: x + 1,
            y: y + 1,
            eleList,
            eleDir,
            moveDir: getGrand(address),
            players: players.map(({ role_name, role_id }) => ({ role_name, role_id }))
        };
    }
};