const { ErrorG, KnapsackG, RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { socializeFn, knapsackFn } = require('../../utils');

const TYPE_MEUN_NAME = {
    1: 'gang',
    2: 'intersect',
    3: 'ranks',
}
const MATERIAL_MEUN = {
    1: [53, 54, 55, 56, 57, 58, 59]
}
module.exports = {
    /**
     * 捐赠材料
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     * @param {*} req.materialId 材料ID
     * @param {*} req.materialNum 材料数量
     */
    material: async function (req, res) {
        const { type, materialId, materialNum } = req.body;
        const materialIdList = MATERIAL_MEUN[type] || [];
        const materialError = materialIdList.includes(materialId) || materialId === 'all' || materialId === -1;
        if (materialNum <= 0 || !type || type === 3) {
            ErrorG.paramsError(res);
            return;
        }
        if (type === 1 && !materialError) {
            ErrorG.paramsError(res);
            return;
        }
        if (type === 2 && materialId !== -1) {
            ErrorG.paramsError(res);
            return;
        }
        // 获取全局角色信息
        const { role_integral, socialize_pool } = RoleG.getRoleGlobal(req, res);
        // 获取帮会信息
        const sociKey = TYPE_MEUN_NAME[type];
        const { id } = socialize_pool[sociKey];
        const socialize = await socializeFn.getSocialize(req, res, id, type);
        if (!socialize) {
            return;
        }
        // 开始捐赠计算
        let { data, tael } = KnapsackG.getknapsackGlobal(req, res);
        // 计算帮会贡献
        const typeText = type === 1 ? '帮会' : '结义';
        // 贡献点
        let proffer = 0;
        // 错误信息
        let message = '';
        // 结果信息
        const text = [];
        // materialId -1 捐献银两
        if (materialId === -1) {
            if (tael < materialNum) {
                message = `银两不足${materialNum}`;
            } else {
                tael -= materialNum;
                // 每100000银两可获得1点贡献与声望
                proffer = parseInt(materialNum / 100000);
                text.push(`捐献${materialNum}银两，获得${typeText}贡献${proffer * 10}点,个人${typeText}声望${proffer}点`);
            }
        }
        // 剩余材料
        // const material = {};
        // 消耗材料列表
        // const materialList = [];
        let materialArticle = undefined;
        // 消耗材料后的背包
        if (materialId === 'all') {
            materialArticle = {};
            data.forEach(({ id, p, s, n }) => {
                if (materialIdList.includes(id) && p === 5) {
                    materialArticle[id] = {
                        id,
                        p,
                        s,
                        n
                    };
                }
            })
        }

        if (materialIdList.includes(materialId)) {
            materialArticle = {};
            data.forEach(({ id, p, n }) => {
                if (materialId === id && p === 5) {
                    materialArticle[id] = {
                        id,
                        p,
                        s: materialNum,
                        n
                    };
                }
            })
        }


        if (materialArticle) {
            const result = knapsackFn.deleteKnapsack(req, res, { article: JSON.parse(JSON.stringify(materialArticle)) });
            message = result.message;
            data = result.data;
        }
        // 判断是否存在错误信息
        if (message) {
            res.send({
                code: 0,
                message: message
            });
            return;
        }

        // 更新全局背包信息
        KnapsackG.updateknapsackGlobal(req, res, { data, tael });
        Object.values(materialArticle || {}).forEach(({ id, s, n }) => {
            const { value } = knapsackTable.getArticle(id);
            proffer += value * s;
            text.push(`捐献${s}个${n}，获得${typeText}贡献${value * s * 10}点,个人${typeText}声望${value * s}点`);
        })
        // 更新全局角色信息
        role_integral[sociKey] += proffer;
        RoleG.updataRoleGlobal(req, res, { role_integral });
        let { exp, level } = socialize;
        let [c_exp, up_exp] = exp.split('/');
        c_exp = Number(c_exp) + (proffer * 10);
        const updata = {};
        if (c_exp >= up_exp) {
            level++;
            c_exp -= up_exp;
            up_exp = 1000 * 10 ** level;
            updata['level'] = level;
        }
        updata['exp'] = `${c_exp}/${up_exp}`;
        // 更新帮会信息
        await socializeFn.updataSocialize(req, res, id, type, updata);
        res.send({
            code: 0,
            data: text.join(',') + '。',
        })
    }
}