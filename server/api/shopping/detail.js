const { shopFn } = require("@/utils");

module.exports = {
    /**
     * 获取店铺详情
     * @param {*} req.role_id 可选参数,不传则是自己
     */
    detail: async function (req, res) {
        const { role_id } = req.body;
        const data = await shopFn.asyncGetShopInfo(req, res, role_id);
        res.send({
            code: 0,
            data
        })
    }
}

