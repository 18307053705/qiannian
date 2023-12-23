const { DailysG, ActiveQueueG } = require("../../global");
const { RACE_MEUN } = require("../../meun");


function title(value) {
    if (value < 200) {
        return '成员';
    }
    if (value < 500) {
        return '精英';
    }
    if (value < 1000) {
        return '霸主';
    }
    if (value < 2000) {
        return '王者';
    }
    return '至尊';
}

/**
 * 获取战场角色信息
 * @param {*} req
 * @param {*} res
 * @param {*} role_race 种族(1人2妖3仙)
 * @param {*} role_id 角色id
 */
function getNameFn(address) {
    const ids = address.split(',')[0];
    if (ids === '60003' && ActiveQueueG.getZhanChang()) {
        return (_, role_race, role_id) => {
            // 战场{s:死亡次数,v:功勋值}
            const { zhanChang = { v: 0 } } = DailysG.getDailysGlobal('', '', { roleId: role_id });
            return {
                role_name: `${RACE_MEUN[role_race]}${title(zhanChang.v)}`,
                zhangChang: true
            }
        }
    }
    return (name) => ({ role_name: name });
}

module.exports = {
    /**
     * 获取坐标内所有玩家
     * @param {*} req 
     * @param {*} res 
     * @param {*} address 坐标 
     * @returns {*} roleInfo[]|[]
     * 
     */
    getAddressPlayers: async function (req, res, address) {
        const { roles, iRole } = RoleG.getRoleAllGlobal(req, res);
        delete roles[iRole.user_id];
        const namefn = getNameFn(address);
        const players = [];
        Object.values(roles).forEach(({ role_name, role_race, role_id, ...role }) => {
            if (role.address === address) {
                players.push({
                    ...role,
                    role_race,
                    role_id,
                    ...namefn(role_name, role_race, role_id),
                });
            }
        })
        return players;
    }
};
