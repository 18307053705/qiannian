const { ElementTable } = require("../../table");

module.exports = {
    /**
     * 必须满足某些条件才会出现的特殊元素
     * @param {*} req 
     * @param {*} res 
     * @param {*} address 坐标
     * @param {*} eleList 元素列表
     * @param {*} eleDir 指令池
     */
    getSpecificGrand: function (req, res, address, eleList, eleDir) {
        const { qingyuan, role_level } = RoleG.getRoleGlobal(req, res);
        const list = [];
        // 情缘之地-情缘树
        if (address === '60000,0,1' && qingyuan.d) {
            const ele = ElementTable.getElement(435);
            list.push({ name: ele.name, cs: 'g_sigh', dir: ele.id });
            eleDir[ele.id] = ele;
            eleList.push(list);
            return;
        }
    }
};
