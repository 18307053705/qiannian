const { ErrorG, RoleG, KnapsackG } = require("../../global");

module.exports = {
    /**
     * 创建店铺
     * @param {*} req.name
     */
    create: async function (req, res) {
        const { name } = req.body;
        if (!name) {
            ErrorG.paramsError(res);
            return;
        }
        const { role_id, role_name, user_id } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from shop where role_id="${role_id}" or name="${name}"`);
        if (results[0]) {
            res.send({
                code: 0,
                message: '店铺名重复!'
            })
            return;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        if (tael < 500000) {
            res.send({
                code: 0,
                message: '银两不足500000'
            })
            return;
        }
        const createDte = new Date() * 1;
        const shopSql = "insert into shop(user_id,role_id,name,petList,article,date,role_name) values(?,?,?,?,?,?,?)";
        const shopData = [user_id, role_id, name, '[]', '[]', createDte, role_name];
        await res.asyncAdd(shopSql, shopData);
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael - 500000 });
        const shop = {
            user_id,
            role_id,
            role_name,
            name,
            petList: [],
            article: [],
            date: createDte
        }
        res.send({
            code: 0,
            data: shop
        })
    }
}

