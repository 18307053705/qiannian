const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
     * 使用名称获取势力信息
     * @param {*} name 势力名称
     * @param {*} type 势力类型 1：帮会 2：庄园 3：队伍
     */
    asyncGetNameSocialize: async function (name, type) {
        const { results } = await asyncQuery(`select * from socialize  where name="${name}" and type=${type} `);
        return results[0];
    },
    /**
     * 使用ID获取势力信息
     * @param {*} soci_id 势力ID
     * @param {*} type 势力类型 1：帮会 2：庄园 3：队伍
     */
    asyncGeIDSocialize: async function (soci_id, type) {
        const { results } = await asyncQuery(`select * from socialize  where soci_id="${soci_id}" and type=${type} `);
        return results[0];
    },
    /**
     * 创建势力
     * @param {*} data.name 势力名称
     * @param {*} data.type 势力类型 1：帮会 2：庄园 3：队伍
     * @param {*} data.level 势力等级
     * @param {*} data.compose 成员[{id:成员id，name：成员名称，level：帮会职位}]
     * @param {*} data.text 帮会描述
     * @param {*} data.soci_id 势力id
     * @param {*} data.apply 申请信息
     * @param {*} data.exp 经验
     */
    asyncCreateSocialize: async function (data) {
        const keys = [];
        const values = [];
        const list = [];
        Object.keys(data).forEach((key) => {
            keys.push(key);
            values.push('?');
            list.push(data[key]);
        })
        const sqlStr = `insert into socialize(${keys.join(',')}) values(${values.join(',')})`;
        const { results } = await asyncAdd(sqlStr, list);
        return results;
    },
    /**
     * 更新势力信息
     * @param {*} soci_id 势力ID
     * @param {*} type 势力类型 1：帮会 2：庄园 3：队伍
     * @param {*} data.name 势力名称
     * @param {*} data.level 势力等级
     * @param {*} data.compose 成员[{id:成员id，name：成员名称，level：帮会职位}]
     * @param {*} data.text 帮会描述
     * @param {*} data.apply 申请信息
     * @param {*} data.exp 经验
     */
    asyncUpdateSocialize: async function (soci_id, type, data) {
        const { results } = await asyncQuery(`update socialize  SET ${data.join(',')}  where soci_id="${soci_id}" and type=${type}`);
        return results[0];
    },
    /**
     * 删除势力
     * @param {*} soci_id 势力ID
     * @param {*} type 势力类型 1：帮会 2：庄园 3：队伍
     */
    asyncDeleteSocialize: async function (soci_id, type) {
        const { results } = await asyncQuery(`delete from socialize  where soci_id="${soci_id}" and type=${type}`);
        return results[0];
    },
    /**
     * 获取势力列表
     * @param {*} type 势力类型 1：帮会 2：庄园 3：队伍
     */
    asyncGetSocializeList: async function (type) {
        const { results } = await asyncQuery(`select * from socialize  where type="${type}"`);
        return results;
    },
}