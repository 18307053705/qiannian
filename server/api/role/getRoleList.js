
module.exports = {
    /**
     * 获取角色列表 
     */
    getRoleList: async (req, res) => {
        const { asyncQuery } = res;
        const user = req.cookies["q_uid"];
        const { results } = await asyncQuery(`select * from role  where user_id="${user}"`);
        res.send({
            code: 0,
            data: results
        });
    }
};