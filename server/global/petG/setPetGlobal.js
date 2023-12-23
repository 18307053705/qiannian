const { petGlobal, PET_JSON_KEYS } = require('./config')

module.exports = {
    /**
     * 设置全局宠物信息
     * @param {*} req 
     * @param {*} res 
     */
    setPetGlobal: async function (req, res) {
        const { role_id, pet_pool } = RoleG.getRoleGlobal(req, res);
        let pet = undefined;
        if (pet_pool.c.id) {
            const { results } = await res.asyncQuery(`select * from  pet where id=${pet_pool.c.id}`);
            pet = results[0];
        }
        if (pet) {
            const petInfo = {};
            Object.keys(pet).forEach((key) => {
                petInfo[key] = PET_JSON_KEYS.includes(key) ? JSON.parse(pet[key]) : pet[key]
            })
            petGlobal[role_id] = {
                ...petInfo,
                updateKeys: []
            };
        }
    }
}