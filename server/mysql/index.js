const config = require("./config");
const UserSql = require('./userSql');
const RoleSql = require('./roleSql');
const KnapsackSql = require('./knapsackSql');
const WarehouseSql = require('./warehouseSql');
const FriendsSql = require('./friendsSql');
const ShopSql = require('./shopSql');
const SocializeSql = require("./socializeSql");
const QingyuanSql = require("./qingyuanSql");
const PetSql = require("./petSql");


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
  UserSql,
  RoleSql,
  KnapsackSql,
  WarehouseSql,
  FriendsSql,
  ShopSql,
  SocializeSql,
  QingyuanSql,
  PetSql
};
