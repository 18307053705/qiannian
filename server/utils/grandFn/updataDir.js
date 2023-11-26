const { GrandG } = require("../../global");
const { ElementTable } = require("../../table");
const roleFn = require("../roleFn");
const grandFn = require("./getGrandInfo");

module.exports = {
    /**
     * 指令打开的面板信息
     * @param {*} req 
     * @param {*} res
     * @param {*} data.address 坐标
     * @param {*} data.currentDir 当前指令具体信息,可选key
     * @param {*} data.path 面板路径,可选key
     * @returns {*} grandInfo 返回坐标
     */
    updataDir: async function (req, res, { address, currentDir = {}, path }) {


        // 移动拦截
        // if (address.split(',')[0] === '60006') {
        //     if (address === '60006,0,5') {
        //         GrandG.setCurrentDir(req, res, ElementTable.getElement(20623));
        //         res.send({
        //             code: 0,
        //             path: '/fight'
        //         })
        //         return;
        //     }
        // }


        // 获取地图玩家信息
        const players = await roleFn.getAddressPlayers(req, res, address);
        // 获取地图元素信息
        const grandInfo = grandFn.getGrandInfo(req, res, address, players);
        // 更新对应角色全局地图指令
        GrandG.setDirGlobal(req, res, { ...grandInfo, currentDir, address });
        res.send({
            code: 0,
            data: {
                ...grandInfo,
                path: path || currentDir.path,
                state: currentDir.state,
            }
        });
    },

};
