const { RoleG } = require('../../global');
const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];

module.exports = {
    /**
     * 更新宠物信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 需要更新的数据
     * @param {*} petId 宠物id
     */
    updataPetInfo: async function (req, res, data, petId) {
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = PET_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`);
        })
        const { results } = await res.asyncQuery(`update pet  SET ${upData.join(',')}  where id="${petId}"`);
        return results;
    }
}