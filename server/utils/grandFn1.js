const { grand } = require("../table/grand");
const Global = require("../global/index2");
const taskFn = require('./taskFn');

module.exports = {
  getGrand: function (id, x, y) {
    const { name, data } = grand[id];
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

    return direction.map(itme => ({ ...itme }));
  },
  getGrandInfo: function (req, address, players) {
    const [id, strX, strY] = address.split(",");
    const x = Number(strX);
    const y = Number(strY);
    const { name, data } = grand[id];
    const grandEle = data[x][y];
    const dirList = {};
    const ele = [];
    grandEle.forEach(info => {
      const eleItme = [];
      info.forEach((itme) => {
        dirList[itme.id] = itme;
        eleItme.push({ name: itme.name, cs: itme.cs, dir: itme.id });
      });
      ele.push(eleItme)
    });
    // 获取任务临时元素
    taskFn.grandTaskEle(req, address, ele, dirList);
    return {
      name,
      x: x + 1,
      y: y + 1,
      data: ele,
      dir: dirList,
      movedir: this.getGrand(id, x, y),
      players: players.map(({ role_name, role_id }) => ({ role_name, role_id }))
    };
  }
};
