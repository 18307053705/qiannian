const mysql = require("../mysql");
const PET_JSON_KEYS = [
    'art',
    'equip',
    'addition',
    'attr',
];

module.exports = {
    PET_JSON_KEYS,
    petGlobal: {
        // key：role_id {...petInfo,updateKeys:[] }
        // updateKeys 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    },
    // 设置宠物全局信息
    setPetGlobal: async function (req) {
        const { role_id, pet_pool } = this.getRoleGlobal(req);
        // const { pet_pool } = JSON.parse(role.pet_pool);
        let pet = undefined;
        if (pet_pool.c.id) {
            const { results } = await mysql.asyncQuery(`select * from  pet where id=${pet_pool.c.id}`);
            pet = results[0];
        }
        if (pet) {
            const petInfo = {};
            Object.keys(pet).forEach((key) => {
                petInfo[key] = PET_JSON_KEYS.includes(key) ? JSON.parse(pet[key]) : pet[key]
            })
            this.petGlobal[role_id] = {
                ...petInfo,
                updateKeys: []
            };
        }

    },
    // 获取宠物全局信息
    getPetGlobal: function (req,roleId) {
        const { role_id } = this.getRoleGlobal(req);
        const pet = this.petGlobal[roleId || role_id];
        return pet ? JSON.parse(JSON.stringify(pet)) : undefined;
    },

    // 更新宠物全局信息
    updatePetGlobal: function (req, data) {
        const { role_id } = this.getRoleGlobal(req);
        const pet = this.petGlobal[role_id];
        let updateKeys = Object.keys(data);
        if (pet) {
            this.petGlobal[role_id] = {
                ...pet,
                ...data,
                updateKeys: [...pet.updateKeys, ...updateKeys]
            };
        }
        return pet ? JSON.parse(JSON.stringify(this.petGlobal[role_id])) : undefined;
    },

    // 宠物释放，信息保存到数据库
    savePet: async function (role_id) {
        const { updateKeys, ...pet } = this.petGlobal[role_id];
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = PET_JSON_KEYS.includes(key) ? JSON.stringify(pet[key]) : pet[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await mysql.asyncQuery(`update pet  SET ${data.join(',')}  where id="${pet.id}"`);
        }
        return;
    }
}
