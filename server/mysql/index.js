const userSql = require('./userSql');
const roleSql = require('./roleSql');
const knapsackSql = require('./knapsackSql');
const warehouseSql = require('./warehouseSql');
const friendsSql = require('./friendsSql');
const ShopSql = require('./shopSql');
const config = require("./config");



module.exports = {
  /**
   *
   * @param {string} queryString  查询语句
   * @param {*} sqlInfo 接入数据库信息，可不传
   */
  asyncQuery: config.asyncQuery,
  /**
   *
   * @param {string} queryString  查询语句
   * @param {*} data 写入数据库的数据
   * @param {*} sqlInfo 接入数据库信息，可不传
   */
  asyncAdd: config.asyncAdd,
  userSql,
  roleSql,
  knapsackSql,
  warehouseSql,
  friendsSql,
  ShopSql,
};
