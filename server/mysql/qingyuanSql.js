const { asyncQuery, asyncAdd } = require('./config');
const DEFAULT_DATA = {
    level: 1,
    exp: '0/100',
    causalityL: 0
};
const FIELD_KEY_LIST = ['role1', 'role2', 'name1', 'name2', 'level', 'exp', 'causality'];
const VALUES = new Array(FIELD_KEY_LIST.length).fill('?').join(',');
module.exports = {
    /**
    * 添加情缘
    * @param {*} data.role1 角色1id
    * @param {*} data.role2 角色2id
    * @param {*} data.name1 角色1名称
    * @param {*} data.name2 角色2名称
    * @param {*} data.level 情缘等级(默认：1)
    * @param {*} data.exp 情缘经验(默认：'0/100')
    * @param {*} data.causality 情缘果数量(默认：0)
    */
    asyncInsertQingYuan: async function (data) {
        const dataObj = { ...DEFAULT_DATA, ...data };
        const list = FIELD_KEY_LIST.map(key => dataObj[key])
        const { results } = await asyncAdd(`insert into qingyuan(${FIELD_KEY_LIST.join(',')}) values(${VALUES})`, list);
        return results;
    },
    /**
     * 获取情缘
     * @param {*} id 情缘id
     */
    asyncGetQingYuan: async function (id) {
        const { results } = await asyncQuery(`select * from qingyuan where id="${id}"`);
        return results[0];
    },
    /**
     * 更新情缘
     * @param {*} id 情缘id
     * @param {*} data 
     */
    asyncUpdateQingYuan: async function (id, data) {
        const sqlStr = Object.keys(data).map((key) => `${key}='${data[key]}'`).join(',');
        const { results } = await asyncQuery(`update qingyuan  SET ${sqlStr}  where id="${id}"`);
        return results[0];
    },
    /**
     * 删除情缘
     * @param {*} id 情缘id
     */
    asyncDeleteQingYuan: async function (id) {
        const { results } = await asyncQuery(`delete from qingyuan  where id="${id}"`);
        return results[0]
    },
}
