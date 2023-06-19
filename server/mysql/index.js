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
 * @param {*} callback 查询结过回调
 * @param {*} sqlInfo 接入数据库信息，可不传
 */
function sqlQuery(queryString, callback, sqlInfo = {}) {
  const connecttion = mysql.createConnection({
    ...SQL_INFO,
    sqlInfo
  });
  //  数据库信息
  connecttion.connect();
  // 查询数据
  connecttion.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }
    //   将结果传入回调函数
    callback(results, fields);
    // 关闭连接
    connecttion.end();
  });
}

function sqlAdd(queryString, data, callback, sqlInfo = {}) {
  const connecttion = mysql.createConnection({
    ...SQL_INFO,
    sqlInfo
  });
  //  数据库信息
  connecttion.connect();
  // 查询数据
  connecttion.query(queryString, data, (err, results, fields) => {
    if (err) {
      throw err;
    }
    //   将结果传入回调函数
    callback(results, fields);
    // 关闭连接
    connecttion.end();
  });
}


/**
 *
 * @param {string} queryString  查询语句
 * @param {*} callback 查询结过回调
 * @param {*} sqlInfo 接入数据库信息，可不传
 */


function asyncQuery(queryString, callback, sqlInfo = {}) {
  return new Promise((resolve, reject) => {
    const connecttion = mysql.createConnection({
      ...SQL_INFO,
      sqlInfo
    });
    //  数据库信息
    connecttion.connect();
    // 查询数据
    connecttion.query(queryString, (err, results, fields) => {
      // 关闭连接
      connecttion.end();
      if (err) {
        // throw err;
        reject({ err, results, fields });
        return;
      }
      //   将结果传入回调函数
      resolve({ results, fields })
    });
  })

}

function asyncAdd(queryString, data, sqlInfo = {}) {
  return new Promise((resolve) => {
    const connecttion = mysql.createConnection({
      ...SQL_INFO,
      sqlInfo
    });
    //  数据库信息
    connecttion.connect();
    // 查询数据
    connecttion.query(queryString, data, (err, results, fields) => {
      if (err) {
        throw err;
      }

      // 关闭连接
      connecttion.end();
      resolve({ results, fields })
    });
  })

}

module.exports = {
  sqlQuery,
  sqlAdd,
  asyncQuery,
  asyncAdd
};
