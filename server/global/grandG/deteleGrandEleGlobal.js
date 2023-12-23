const { GRAND_ELE_Global } = require('./config');
module.exports = {
    /**
     * 删除地图物品元素
     * @param {*} req 
     * @param {*} res 
     * @param {*} in_x 删除的下标
     */
    deteleGrandEleGlobal: function (req, res, in_x) {
        const { address } = RoleG.getRoleGlobal(req, res);
        const gandEle = GRAND_ELE_Global[address];
        const { articleEle = [] } = gandEle;
        articleEle.splice(in_x,1)
        // 保存到当前地址
        GRAND_ELE_Global[address]['articleEle'] = articleEle;
    }

}