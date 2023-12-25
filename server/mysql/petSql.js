const { asyncQuery, asyncAdd } = require('./config');
const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];
module.exports = {
    /**
     * 新增宠物
     * @param {*} petId 宠物id
     */
    asyncInsertPet: async function (data) {
        const keys = [];
        const values = [];
        const list = [];
        Object.keys(data).forEach(key => {
            keys.push(key);
            values.push("?");
            list.push(PET_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key]);
        })
        const sqlStr = `insert into pet(${keys.join(',')}) values(${values.join(',')})`;
        const { results } = await asyncAdd(sqlStr, list);
        return results;
    },
    /**
    * 获取宠物
    * @param {*} petId 宠物id
    */
    asyncGetPet: async function (petId) {
        const { results } = await asyncQuery(`select * from  pet where id=${petId}`);
        const pet = results[0];
        PET_JSON_KEYS.forEach((key) => {
            pet[key] = JSON.parse(pet[key]);
        })
        return pet;
    },
    /**
     * 更新宠物
     * @param {*} petId 宠物id
     * @param {*} data 更新信息
     */
    asyncUpdatePet: async function (petId, data) {
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = PET_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`);
        })
        const { results } = await asyncQuery(`update pet  SET ${upData.join(',')}  where id="${petId}"`);
        return results;
    },
}
