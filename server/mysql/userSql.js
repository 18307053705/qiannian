const { asyncQuery, asyncAdd } = require('./config');
const { getMacAdress } = require('@/utils/osFn/getMacAdress');
module.exports = {
    /**
     * 获取账号信息
     * @param {*} user 账号
     * @param {*} pass 密码
     */
    asyncGetUserInfo: async function (user, pass) {
        const { results } = await asyncQuery(`select * from user  where user="${user}" and pass="${pass}"`);
        return results[0];
    },
    /**
    * 获取账号是否存在
    * @param {*} user 账号
    */
    asyncGetUser: async function (user) {
        const { results } = await asyncQuery(`select * from user  where user="${user}"`);
        return results[0];
    },
    /**
   * 添加账号
   * @param {*} user 账号
   * @param {*} pass 密码
   */
    asyncRegisterUser: async function (user, pass) {
        const { results } = await asyncAdd("insert into user(user,pass,address) values(?,?,?)", [user, pass, getMacAdress()]);
        return results.insertId;;
    },
}
