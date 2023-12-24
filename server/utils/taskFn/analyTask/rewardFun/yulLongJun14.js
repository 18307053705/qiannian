function getEquip(role_career) {
    if ([1, 4, 7].includes(role_career)) {
        return `26-1`
    }
    if ([2, 5, 8].includes(role_career)) {
        return `31-1`
    }
    if ([3, 6, 9].includes(role_career)) {
        return `36-1`
    }

}
module.exports = {
    // 御龙军14环
    yulLongJun14: function (req, res) {
        const { role_career } = RoleG.getRoleGlobal(req, res);
        return {
            attr: "exp-20000,world-200",
            equip: getEquip(role_career),
        }
    },


}
