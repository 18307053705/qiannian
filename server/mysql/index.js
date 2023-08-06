const mysql = require("mysql2");

// 接入数据库信息
const SQL_INFO = {
  host: "localhost",
  user: "ZhouXiaoBing",
  password: "Zzxb8888",
  database: "qiannian"
};

/**
 *
 * @param {string} queryString  查询语句
 * @param {*} sqlInfo 接入数据库信息，可不传
 */
function asyncQuery(queryString, sqlInfo = {}) {
  return new Promise((resolve, reject) => {
    const connecttion = mysql.createConnection({
      ...SQL_INFO,
      ...sqlInfo
    });
    //  数据库信息
    connecttion.connect();
    // 查询数据
    connecttion.query(queryString, (err, results, fields) => {
      // 关闭连接
      connecttion.end();
      if (err) {
        reject({ err, results, fields });
        return;
      }
      //   将结果传入回调函数
      resolve({ results, fields })
    });
  })

}

/**
 *
 * @param {string} queryString  查询语句
 * @param {*} data 写入数据库的数据
 * @param {*} sqlInfo 接入数据库信息，可不传
 */
function asyncAdd(queryString, data, sqlInfo = {}) {
  return new Promise((resolve, reject) => {
    const connecttion = mysql.createConnection({
      ...SQL_INFO,
      ...sqlInfo
    });
    //  数据库信息
    connecttion.connect();
    // 查询数据
    connecttion.query(queryString, data, (err, results, fields) => {
      if (err) {
        reject({ err, results, fields });
        return;
      }
      // 关闭连接
      connecttion.end();
      resolve({ results, fields })
    });
  })

}

module.exports = {
  /**
   *
   * @param {string} queryString  查询语句
   * @param {*} sqlInfo 接入数据库信息，可不传
   */
  asyncQuery,
  /**
   *
   * @param {string} queryString  查询语句
   * @param {*} data 写入数据库的数据
   * @param {*} sqlInfo 接入数据库信息，可不传
   */
  asyncAdd
};
