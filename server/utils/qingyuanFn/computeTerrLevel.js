const { QingyuanSql } = require('@/mysql');
const { terrAttr } = require("./terrAttr");

module.exports = {
    /**
     * 增加情缘树经验
     * @param {*} req 
     * @param {*} res 
     * @param {*} cExp 增加的经验 
     */
    computeTerrLevel: async function (req, res, cExp) {
        const role = RoleG.getRoleGlobal(req, res)
        const { d } = role.qingyuan;
        const qingyuan = await QingyuanSql.asyncGetQingYuan(d.id);
        // // 计算操作后的情缘信息
        const { level, exp, causality } = qingyuan;
        const [oldExp, upExp] = exp.split('/');
        let current = Number(oldExp) + cExp;
        const updata = {
            exp: `${current}/${upExp}`
        };
        if (current >= upExp && level < 100) {
            const upLevel = level + 1;
            current -= upExp;
            updata.exp = `${current}/${(upLevel + 1) * 100}`;
            updata.level = upLevel;
            updata.causality = causality + upLevel * 100;
            // 若升级需要处理双方额外属性加成
            await terrAttr(req, res);
        }
        // 更新情缘
        QingyuanSql.asyncUpdateQingYuan(d.id, updata);
    }
}