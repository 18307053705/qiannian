const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
     * 根据角色ID获取店铺信息
     * @param {*} role_id 
     */
    asyncIdToShop: async function (role_id) {
        const { results } = await asyncQuery(`select * from shop  where role_id="${role_id}"`);
        return results;
    },
    /**
    * 更新角色店铺信息
    * @param {*} sqlStr mql语句 
    * @param {*} role_id 
    */
    asyncUpdateShop: async function (sqlStr, role_id) {
        const { results } = await asyncQuery(`update shop  SET ${sqlStr}  where role_id="${role_id}"`);
        return results;
    },
    /**
     * 根据角色ID或者店铺名获取店铺信息
     * @param {*} role_id
     * @param {*} name 
     */
    asyncIdOrNameToShop: async function (role_id, name) {
        const { results } = await asyncQuery(`select * from shop where role_id="${role_id}" or name="${name}"`);
        return results;
    },
    /**
    * 根据店铺名获取店铺信息
    * @param {*} name 
    */
    asyncNameToShop: async function (name) {
        const { results } = await asyncQuery(`select * from shop where name="${name}"`);
        return results;
    },
    /**
    * 创建店铺
    * @param {*} data.user_id 角色账号 
    * @param {*} data.role_id 角色ID
    * @param {*} data.role_name 角色名称
    * @param {*} data.name 店铺名称
    */
    asyncCreateShop: async function ({ user_id, role_id, name, role_name }) {
        const createDte = new Date() * 1;
        const sqlStr = "insert into shop(user_id,role_id,name,petList,article,date,role_name) values(?,?,?,?,?,?,?)";
        const list = [user_id, role_id, name, '[]', '[]', createDte, role_name];
        await asyncAdd(sqlStr, list);
        const shop = {
            user_id,
            role_id,
            role_name,
            name,
            petList: [],
            article: [],
            date: createDte
        }
        return shop;
    },
    /**
     * 获取店铺店铺列表
     * @param {*} data.user_id 角色账号 
     * @param {*} data.role_id 角色ID
     * @param {*} data.role_name 角色名称
     * @param {*} data.name 店铺名称
     */
    asyncShopList: async function (role_id) {
        const { results } = await asyncQuery(`select * from shop where role_id<>"${role_id}"`);
        return results;
    }
}
