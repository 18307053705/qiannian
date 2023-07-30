const { roleFn } = require('../../utils');

module.exports = {
    /**
     * 获取角色信息
     */
    getRoleInfo: async (req, res) => {
        const { role_id } = req.body;
        const roleInfo = await roleFn.getRoleInfo(req, res, {role_id});
        
        res.send({
            code: 0,
            data: roleInfo
        });
    }
};

// router.post("/getRoleInfo", async (req, res) => {
//     const { role_id } = req.body;
//     const role = await roleFn.getRoleInfo(req, role_id);
//     if (role) {
//         // 计算角色属性
//         const data = roleFn.computeRoleAttr(req, role, role_id);
//         if (!data) {
//             return;
//         }
//         res.send({
//             code: 0,
//             data: {

//                 role_id: role['role_id'],
//                 attr: data.attr,
//                 buff: data.buff,
//                 life: role['life'] > data.attr.life_max ? data.attr.life_max : role['life'],
//                 mana: role['mana'] > data.attr.mana_max ? data.attr.mana_max : role['mana'],
//                 role_name: role['role_name'],
//                 role_level: role['role_level'],
//                 role_exp: role['role_exp'],
//                 role_evil: role['role_evil'],
//                 role_signature: role['role_signature'],
//                 role_career: CAREER_TYPE[role['role_career']],
//                 role_race: RACE_TYPE[role['role_race']],
//                 role_realm: realm[role['role_realm']] ? realm[role['role_realm']].name : '',
//                 role_sex: role['role_sex'],
//                 role_title: title[role['role_title']] ? title[role['role_title']].name : '',
//                 reputation_pool: role['reputation_pool'],
//                 socialize_pool: role['socialize_pool'],
//                 equip_pool: role['equip_pool'],
//                 role_integral: role['role_integral'],
//                 pet_pool: role['pet_pool'],
//                 treasure_pool: role['treasure_pool'],
//             }
//         });
//     }


// });