const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
    * 添加好友信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddFriends: async function (user, role_id) {
        const friendsSql = "insert into friends(user_id,role_id,list,apply) values(?,?,?,?)";
        const friendsData = [user, role_id, '[]', '[]'];
        const { results } = await asyncAdd(friendsSql, friendsData);
        return results;
    },
}
