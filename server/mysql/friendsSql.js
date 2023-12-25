const { asyncQuery, asyncAdd } = require('./config');
const JSON_KEY_LIST = ['list', 'apply'];
module.exports = {
    /**
    * 添加好友信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddFriends: async function (user, role_id) {
        const sqlStr = "insert into friends(user_id,role_id,list,apply) values(?,?,?,?)";
        const list = [user, role_id, '[]', '[]'];
        const { results } = await asyncAdd(sqlStr, list);
        return results;
    },
    /**
     * 获取好友信息
     * @param {*} roleId
     */
    asyncGetFriendsInfo: async function (roleId) {
        const { results } = await asyncQuery(`select * from friends  where role_id="${roleId}"`);
        const data = results[0];
        if (data) {
            JSON_KEY_LIST.forEach((key) => {
                data[key] = JSON.parse(data[key]);
            })
        }
        return data;
    },
    /**
     * 获取多个好友信息
     * @param {*} roleIds []role_id
     */
    asyncGetFriendsInfos: async function (roleIds) {
        const { results } = await asyncQuery(`select * from friends  where role_id in (${roleIds.map(id => `'${id}'`).join(',')})`);
        const data = results?.map((item) => {
            JSON_KEY_LIST.forEach((key) => {
                item[key] = JSON.parse(item[key]);
            })
            return item;
        })
        return data;
    },
    /**
     * 更新好友信息
     * @param {*} roleId 角色id
     * @param {*} data 更新数据
     */
    asyncUpdateFriends: async function (roleId, data) {
        const sqlStr = Object.keys(data).map((key) => {
            return JSON_KEY_LIST.includes(key) ? `${key}='${JSON.stringify(data[key])}'` : data[key];
        }).join(',');
        const { results } = await asyncQuery(`update friends  SET ${sqlStr} where role_id="${roleId}"`);
        return results;
    },
}
