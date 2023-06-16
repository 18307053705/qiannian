const roleFn = require("./roleFn");
const grandFn = require("./grandFn");
const Global = require("../global");
const fightFn = require("./fightFn");
const { ERR_MEUN, error } = require("./errorFn");

const mapDir = {
  l: "l",
  u: "u",
  r: "r",
  d: "d"
};

module.exports = {
  mapDir,
  dirControl: function (req, res) {
    // 获取对应角色指令
    const { eleDir = [], moveDir = [] } = Global.getDir(req) || {};
    const { dir } = req.body;
    // 选择角色进入地图指令
    if (dir == -1) {
      this["enterDir"](req, res);
      return;
    }
    // 回城指令
    if (dir == -2) {
      this["toBrDir"](req, res);
      return;
    }
    // 地图移动指令
    if (mapDir[dir]) {
      moveDir.includes(dir) ? this["moveDir"](dir, req, res) : error(res, ERR_MEUN.DIR);
      return;
    }
    // 地图元素指令：位置传送 type:3，打开面板 type !=3
    const dirInfo = eleDir[dir];
    if (dirInfo) {
      const { type, dir: dirId } = dirInfo;
      type === 3 ? this['tpDir'](dirId, req, res) : this['panelDir'](dirInfo, req, res);
      return;
    }
    throw ERR_MEUN.DIR;

  },
  // 指令为-1 则是选择角色进入游戏,初次发出指令
  enterDir: async function (req, res) {
    const results = await roleFn.getRoleInfo(req, res);
    if (results) {
      this["toDir"](req, res, results.address);
    }
  },
  // 指令为-2 回城指令
  toBrDir: async function (req, res) {
    const results = await roleFn.getRoleInfo(req, res);
    if (results) {
      let address = '';
      switch (results.role_race) {
        case 1:
          address = '10000,0,0';
          break;
        case 2:
          address = '10001,0,0';
          break;
        case 3:
          address = '10002,0,0';
          break;
      }
      const update = await roleFn.updateRoleInfo(req, { address });
      if (update.changedRows) {
        this["toDir"](req, res, address);
      }
    }
  },
  //   传送指令
  tpDir: async function (dir, req, res) {
    const update = await roleFn.updateRoleInfo(req, { address: dir });
    if (update.changedRows) {
      this["toDir"](req, res, dir);
    }
  },
  //   地图指令
  moveDir: async function (dir, req, res) {
    const results = await roleFn.getRoleInfo(req, res);
    if (results) {
      const { address } = results;
      const [id, strX, strY] = address.split(",");
      let x = Number(strX);
      let y = Number(strY);
      switch (dir) {
        case mapDir.u:
          x++;
          break;
        case mapDir.r:
          y++;
          break;
        case mapDir.d:
          x--;
          break;
        case mapDir.l:
          y--;
          break;
      }
      const upAddress = `${id},${x},${y}`;
      const update = await roleFn.updateRoleInfo(req, { address: upAddress });
      if (update.changedRows) {
        this["toDir"](req, res, upAddress);
      }
    }
  },
  // 更新角色地图指令信息,并返回前端
  toDir: async function (req, res, address) {
    // 获取地图玩家信息
    const players = await roleFn.getAddressPlayers(req, address);
    // 获取地图元素信息
    const { dir, ...data } = grandFn.getGrandInfo(req, address, players);
    // 更新对应角色全局地图指令
    // Global.grandDir.set(req, { moveDir: data.grand.map(({ dir }) => dir), eleDir: dir, address });
    Global.setDir(req, { moveDir: data.grand.map(({ dir }) => dir), eleDir: dir, address });
    res.send({
      code: 0,
      data
    });
  },
  panelDir: function (dirInfo, req, res) {
    Global.setDir(req, { extDir: dirInfo });
    const { dir, type } = dirInfo;
    let path = '';
    // 怪物元素，进入战斗界面
    if (type === 5) {
      fightFn.creatFight(req, res).then(() => {
        res.send({
          code: 0,
          data: {
            path: '/fight'
          }
        });
      })
      return;
    }
    //  // npc元素，进入战斗界面
    //  if(type === 1){
    //   path = '/fight';
    // }
    res.send({
      code: 0,
      data: {
        path: path || dir,
        ext: dirInfo['ext']
      }
    });
  }
};
