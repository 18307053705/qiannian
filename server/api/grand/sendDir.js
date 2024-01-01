const { grandFn } = require('@/utils');
const { GrandG, ActivityG } = require('@/global');

module.exports = {
    /**
     * 获取角色信息
     */
    sendDir: async (req, res) => {
        const { dir } = req.body;
        // 获取对应角色指令
        const { eleDir = {}, moveDir = [] } = GrandG.getDirGlobal(req, res);
        // 选择角色进入地图指令
        if (dir == -1) {
            const address = await grandFn.enterDir(req, res);
            return grandFn.updataDir(req, res, { address });
        }

        // 地图移动指令
        if (moveDir.find((itme) => itme.dir === dir)) {
            const address = grandFn.moveDir(req, res, dir);
            return grandFn.updataDir(req, res, { address });
        }

        // 地图元素指令：位置传送 type:3，打开面板 type !=3
        const currentDir = eleDir[dir] || {};
        const { type, dir: dirId } = currentDir;
        if (type === 3) {
            return grandFn.updataDir(req, res, { address: dirId, currentDir });
        }

        if (type !== 3) {
            ActivityG.listenJinYinDao(req, res, currentDir);
            const panelInfo = grandFn.panelDir(req, res, currentDir);
            return grandFn.updataDir(req, res, { ...panelInfo, currentDir });
        }
        global.unknownError(res);
    }
};