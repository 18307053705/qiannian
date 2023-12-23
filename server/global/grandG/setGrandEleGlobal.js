const { GRAND_ELE_Global } = require('./config');

module.exports = {
    /**
     * 设置角色全局指令信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.articleEle:元素信息[id,s,p]
     */
    setGrandEleGlobal: function (req, res, { article }) {
        if (!article) {
            return;
        }
        const { address } = RoleG.getRoleGlobal(req, res);
        const gandEle = GRAND_ELE_Global[address];
        if (!gandEle) {
            GRAND_ELE_Global[address] = {};
        }
        const { articleEle = [] } = gandEle || {};
        //   时间戳为秒
        const time = parseInt(new Date / 1000) + 1800;
        // 物品元素{id,s,p,time(过期时间)}
        article.forEach((itme) => {
            articleEle.push({
                ...itme,
                time
            })
        })
        // 保存到当前地址
        GRAND_ELE_Global[address]['articleEle'] = articleEle;
    }

}