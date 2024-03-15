const { RealmTable } = require('@/table');
const { knapsackFn } = require('@/utils');
const { AttrSystem } = require('@/system');
module.exports = {
    /**
     * 突破境界
     * @param
     */
    advanced: function (req, res) {
        const { role_attr, role_realm, role_level } = RoleG.getRoleGlobal(req, res);

        // 前置校验
        // 获取突破的境界信息
        const nextRealm = RealmTable.getRealm(role_realm + 1);
        if (!nextRealm) {
            res.send({
                code: 0,
                message: '未知境界，突破失败。'
            })
            return;
        }
        const { condition } = nextRealm;
        const { article, level, tael } = condition;
        if (role_level < level) {
            res.send({
                code: 0,
                message: '角色等级不足，突破失败。'
            })
            return;
        }
        const { tael: taels, data } = KnapsackG.getknapsackGlobal(req, res);
        if (taels < tael) {
            res.send({
                code: 0,
                message: '银两不足，突破失败。'
            })
            return;
        }

        // 计算消耗材料
        const delArticle = {};
        article.split(',').forEach((itme) => {
            const [id, s] = itme.split('-');
            delArticle[id] = {
                s: Number(s),
                id
            }
        })
        const { message } = knapsackFn.deleteKnapsack(req, res, delArticle, data);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }

        // 检验通过，突破境界
        const { ele, potential: addQianLi, name } = nextRealm;
        // 总潜力增加
        role_attr.max_qian_li += addQianLi;
        // 可用潜力增加
        role_attr.qian_li += addQianLi;
        // 境界元素属性增加
        Object.keys(AttrSystem.getInitEleAttr()).forEach(key => {
            role_attr.addition[key] += ele;
        })

        RoleG.updataRoleGlobal(req, res, { role_attr, role_realm: role_realm + 1 });

        res.send({
            code: 0,
            success: `恭喜玩家成功突破至${name}！`
        })
    }
}

