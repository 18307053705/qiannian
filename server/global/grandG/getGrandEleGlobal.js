const { GRAND_ELE_Global } = require('./config');
const { getDataName } = require('../../table/knapsack/getDataName');


module.exports = {
    /**
     * 设置角色全局指令信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} dirInfo.articleEle:元素信息n,p,id,s,in_x
     */
    getGrandEleGlobal: function (req, res, address) {
        const gandEle = GRAND_ELE_Global[address];
        if (!gandEle) {
            return { articleEle: [] }
        }
        const { articleEle = [] } = gandEle;
        //   时间戳为秒
        const curTime = new Date / 1000;
        // 物品元素{id,s,p,time(过期时间)}
        const list = articleEle.filter(({ time }) => time > curTime)
        GRAND_ELE_Global[address]['articleEle'] = list;
        return {
            articleEle: list.map(({ id, p, s }, in_x) => {
                return {
                    n: getDataName(id, p),
                    id,
                    p,
                    s,
                    in_x
                }
            })
        }
    }

}