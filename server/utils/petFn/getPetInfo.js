const { RoleG } = require('../../global');
const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} petId 宠物ID
     * @returns {Promise}
     */
    getPetInfo: async function (req, res,petId) {
        const { results } = await mysql.asyncQuery(`select * from  pet where id=${id}`);
        const pet = results[0];
        if (pet) {
            const petInfo = {};
            Object.keys(pet).forEach((key) => {
                petInfo[key] = PET_JSON_KEYS.includes(key) ? JSON.parse(pet[key]) : pet[key]
            })
            return petInfo;
        }
        return {}
    }
}