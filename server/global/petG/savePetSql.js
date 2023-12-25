const { petGlobal } = require('./config');
const { PetSql } = require('@/mysql');
module.exports = {
    savePetSql: async function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const petInfo = petGlobal[role_id];
        if (!petInfo) {
            return;
        }
        const { updateKeys, ...pet } = petInfo;
        const data = {};
        [...new Set(updateKeys)].forEach((key) => {
            data[key] = pet[key];
        })
        if (JSON.stringify(data) !== '{}') {
            await PetSql.asyncUpdatePet(pet.id, data);
            delete petGlobal[role_id];
        }
        return;
    }
}