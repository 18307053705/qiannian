const { DailysG } = require('@/global');
module.exports = {
    /**
     * 获取珍宝信息
     * @param {*} req 
     * @param {*} res 
     */
    get: async function (req, res) {
        const { treasure_pool, role_level } = RoleG.getRoleGlobal(req, res);
        const dailys = DailysG.getDailysGlobal(req, res);
        const data = {};
        Object.keys(treasure_pool).forEach(key => {
            if (dailys[key]) {
                data[key] = {
                    ...treasure_pool[key],
                    s: dailys[key]
                }
            } else {
                data[key] = treasure_pool[key]
            }
        })
        res.send({
            code: 0,
            data: {
                ...data,
                dailys,
                role_level
            }
        })

    }
}