const { RoleG } = require("../../global");

module.exports = {
    /**
     * 创建情缘
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 插入数据库数据
     */
    insertQingYuan: async function (req, res, data) {
        const values = [];
        const list = [];
        const keys = Object.keys(data).map((key) => {
            values.push('?');
            list.push(data[key]);
            return key;
        }).join(',')

        // const sql = "insert into qingyuan(role1,role2,name1,name2,level,exp,causality) values(?,?,?,?,?,?,?)";
        const sql = `insert into qingyuan(${keys}) values(${values.join(',')})`;
        // const data = [iRoleId, tRoleId, iRoleName, tRoleName, 1, '0/100', 0];
        const { results } = await res.asyncAdd(sql, list);
        return results;
    }
}