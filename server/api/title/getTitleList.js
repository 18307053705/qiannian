
const { TitleTable } = require('../../table');

module.exports = {
    /**
     * 获取称号列表
     */
    getTitleList: async function (req, res) {
        const { role_title, title_list } = RoleG.getRoleGlobal(req, res);
        // const titles = TitleTable.getTitleAll();
        res.send({
            code: 0,
            data: {
                all: TitleTable.getTitleAll(),
                title_list,
                role_title,
            }
        })

    }
}
