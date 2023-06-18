const mysql = require("../mysql");
const Global = require("../global");

const JOSN_KEYS = ['compose', 'apply'];

module.exports = {
    // 获取势力信息
    getSocialize: async function (id, type) {
        const { results } = await mysql.asyncQuery(`select * from socialize  where soci_id="${id}" and type=${type}`);
        if (results[0]) {
            return {
                ...results[0],
                compose: JSON.parse(results[0]['compose']),
                apply: JSON.parse(results[0]['apply']),
            }
        }
        return undefined;
    },
    // 修改势力信息
    updataSocialize: async function (id, type,data) {
        const upData = [];
        Object.keys(data).forEach(key => {
            let value = JOSN_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        // const { results } = await mysql.asyncQuery(`select * from socialize  where soci_id="${id}" and type=${type}`);
        const { results } = await mysql.asyncQuery(`update socialize  SET ${upData.join(',')}  where soci_id="${id}" and type=${type}`);
        return results;
    },
}