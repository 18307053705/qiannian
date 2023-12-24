const { SocializeSql } = require('@/mysql');
const JOSN_KEYS = ['compose', 'apply'];
module.exports = {
    /**
     * 更新势力信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} id 势力id
     * @param {*} type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {object} data 更新的数据
     * @returns Promise | undefined
     * @returns  socialize.id 
     * @returns  socialize.name 名称
     * @returns  socialize.level 等级
     * @returns  socialize.exp 经验
     * @returns  socialize.text 描述
     * @returns  socialize.type 类型(1:帮会,2:结义,3:队伍)
     * @returns  socialize.compose 成员
     * @returns  socialize.apply 申请列表
     * @returns  socialize.soci_id 
     */
    updataSocialize: async function (req, res, id, type, data) {
        const upData = [];
        Object.keys(data).forEach(key => {
            let value = JOSN_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        const results = await SocializeSql.asyncUpdateSocialize(id, type, upData);
        return results;
    },
}