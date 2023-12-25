const { PetSql } = require('@/mysql');
const { petGlobal } = require('./config');

module.exports = {
    /**
     * 设置全局宠物信息
     * @param {*} req 
     * @param {*} res 
     */
    setPetGlobal: async function (req, res) {
        const { role_id, pet_pool } = RoleG.getRoleGlobal(req, res);
        let pet;
        if (pet_pool.c.id) {
            pet = await PetSql.asyncGetPet(pet_pool.c.id);
        }
        if (pet) {
            petGlobal[role_id] = {
                ...pet,
                updateKeys: []
            };
        }
    }
}