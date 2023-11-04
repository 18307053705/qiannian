const { roleFn } = require('../../utils');
const { ErrorG } = require('../../global');
const { RealmTable, TitleTable } = require('../../table');
const MEUN = require('../../meun')
module.exports = {
    /**
     * 获取角色信息
     */
    getRoleInfo: async (req, res) => {
        const { role_id } = req.body;
        const role = await roleFn.getRoleInfo(req, res, { role_id });
        if (role) {
            // 计算角色属性
            const data = roleFn.computeRoleAttr(req, res, role, { role_id });
            const realm = RealmTable.getRealm(role['role_realm']);
            const title = TitleTable.getTitle(role['role_title']);
            const role_career = MEUN.CAREER_MEUN[role['role_career']];
            const role_race = MEUN.RACE_MEUN[role['role_race']];
            return res.send({
                code: 0,
                data: {
                    role_id: role['role_id'],
                    attr: data.attr,
                    buff: data.buff,
                    life: role['life'] > data.attr.life_max ? data.attr.life_max : role['life'],
                    mana: role['mana'] > data.attr.mana_max ? data.attr.mana_max : role['mana'],
                    role_name: role['role_name'],
                    role_level: role['role_level'],
                    role_exp: role['role_exp'],
                    role_evil: role['role_evil'],
                    role_signature: role['role_signature'],
                    role_career,
                    role_race,
                    role_realm: realm.name,
                    role_sex: role['role_sex'],
                    role_title: title.name,
                    reputation_pool: role['reputation_pool'],
                    socialize_pool: role['socialize_pool'],
                    equip_pool: role['equip_pool'],
                    role_integral: role['role_integral'],
                    pet_pool: role['pet_pool'],
                    treasure_pool: role['treasure_pool'],
                    jackpot: role['jackpot'],
                    role_lx: role['role_lx'],
                }
            });
        }
        ErrorG.roleError(res);
    }
};
