module.exports = {
    /**
     * 获取情缘信息
     * @param {*} req 
     * @param {*} res 
     */
    getQingyuanInfo: async function (req, res) {
        const { qingyuan } = RoleG.getRoleGlobal(req, res);
        const { d } = qingyuan;
        const { results } = await res.asyncQuery(`select * from qingyuan where id="${d.id}"`);
        return results[0];
    }
}