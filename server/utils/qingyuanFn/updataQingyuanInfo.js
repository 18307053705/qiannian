module.exports = {
    /**
     * 获取情缘信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新的数据 
     */
    updataQingyuanInfo: async function (req, res, data) {
        const { qingyuan } = RoleG.getRoleGlobal(req, res);
        const { d } = qingyuan;
        // 否则更新数据库
        const updata = [];
        Object.keys(data).forEach((key) => {
            updata.push(`${key}='${data[key]}'`);
        })
        const { results } = await res.asyncQuery(`update qingyuan  SET ${updata.join(',')}  where id="${d.id}"`);
        return results[0];
    }
}