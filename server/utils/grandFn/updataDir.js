const { GrandG } = require("@/global");
const { ElementTable } = require("@/table");
const grandFn = require("./getGrandInfo");

const DONT_INFO = {
    0: {
        address: '60006,0,1',
        freakID: 20623
    },
    1: {
        address: '60006,0,2',
        freakID: 20624
    },
    2: {
        address: '60006,0,3',
        freakID: 20625
    },
    3: {
        address: '60006,0,4',
        freakID: 20626
    },
    4: {
        address: '60006,0,5',
        freakID: 20627
    },
    5: {
        address: '60006,0,6',
        freakID: 20628
    },
}
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
        const { address: oldAddress, upper_limit } = RoleG.getRoleGlobal(req, res);
        const { dongTian = 0 } = upper_limit;
        // 洞天福地，移动拦截
        if (address.split(',')[0] === '60006' && address.split(',')[2] > dongTian) {
            const freakID = [20623, 20624, 20625, 20626, 20627, 20628][dongTian];
            GrandG.setDirGlobal(req, res, { currentDir: ElementTable.getElement(freakID) });
            res.send({
                code: 0,
                path: '/fight'
            })
            return;
        }


        // 获取地图元素信息
        const grandInfo = grandFn.getGrandInfo(req, res, address);
        // 更新对应角色全局地图指令
        GrandG.setDirGlobal(req, res, { ...grandInfo, currentDir, address });
        // 更新角色坐标
        if (oldAddress !== address) {
            RoleG.updataRoleGlobal(req, res, { address });
        }
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
