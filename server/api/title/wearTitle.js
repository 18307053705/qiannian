const { RoleG } = require("../../global");
const { TitleTable } = require('../../table');

module.exports = {
    /**
     * 称号佩戴与卸下
     */
    wearTitle: async function (req, res) {
        const { id } = req.body;
        let { role_title, title_list, role_attr } = RoleG.getRoleGlobal(req, res);
        // 佩戴校验
        if (id && id === role_title) {
            res.send({
                code: 0,
                message: '已佩戴此称号'
            })
            return;
        }
        // 佩戴校验
        if (id && !title_list.includes(id)) {
            res.send({
                code: 0,
                message: '未拥有此称号'
            })
            return;
        }
        // 佩戴校验
        if (!id && !role_title) {
            res.send({
                code: 0,
                message: '未佩戴称号，无需卸下'
            })
            return;
        }
        const { addition } = role_attr;

        // 存在称号 - 卸下称号
        if (role_title) {
            role_title = 0;
            const { effect } = TitleTable.getTitle(role_title);
            Object.keys(effect).forEach((key) => {
                const val = effect[key];
                if (key === 'life' || key === 'mana') {
                    addition[`${key}_max`] -= val;
                    addition[key] -= val;
                    return;
                }
                if (key === 'hit' || key === 'dodge' || key === "sudden") {
                    addition[key] -= val;
                    return;
                }
                addition[`${key}_max`] -= val;
                addition[`${key}_min`] -= val;
            })

        }
        // 开始佩戴
        if (id) {
            role_title = Number(id);
            const { effect } = TitleTable.getTitle(id);
            Object.keys(effect).forEach((key) => {
                const val = effect[key];
                if (key === 'life' || key === 'mana') {
                    addition[`${key}_max`] += val;
                    addition[key] += val;
                    return;
                }
                if (key === 'hit' || key === 'dodge' || key === "sudden") {
                    addition[key] += val;
                    return;
                }
                addition[`${key}_max`] += val;
                addition[`${key}_min`] += val;
            })
        }
        RoleG.updataRoleGlobal(req, res, { role_title, role_attr });
        res.send({
            code: 0,
            data: { role_title }
        })

    }
}
