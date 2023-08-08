const { petGlobal, PET_JSON_KEYS } = require('./config')
const { getRoleGlobal } = require('../roleG/getRoleGlobal')

module.exports = {
    savePetSql: async function (req,res) {
        const { role_id } = getRoleGlobal(req, res);
        const petInfo = petGlobal[role_id];
        if (!petInfo) {
            return;
        }
        const { updateKeys, ...pet } = petInfo;
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = PET_JSON_KEYS.includes(key) ? JSON.stringify(pet[key]) : pet[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await res.asyncQuery(`update pet  SET ${data.join(',')}  where id="${pet.id}"`);
            delete petGlobal[role_id];
        }
        return;
    }
}