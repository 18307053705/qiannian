const { KnapsackG, ErrorG, RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');
const materialIdMap = {
    // 强化卡初始id 90-105 1-16
    1: function (firm) {
        const id = 1833 + firm;
        const { name } = knapsackTable.getArticle(id);
        return {
            article: {
                [id]: {
                    name,
                    s: 1
                }
            },
            rate: 100
        }
    },
    2: function (firm) {
        const s = 2 ** firm;
        const { name } = knapsackTable.getArticle(1899);
        return {
            article: {
                [1899]: {
                    name,
                    s
                }
            },
            rate: 100
        }
    },
    3: function (firm) {
        const s = firm < 11 ? 2 ** firm : 512 * firm;
        const upFirm = firm + 1;
        let rate = 100 - upFirm * 10;
        if (upFirm > 7) {
            rate -= (upFirm - 5) * 5;
        }
        if (upFirm > 12) {
            rate = 5 - (upFirm - 12)
        }
        const { name } = knapsackTable.getArticle(1899);
        return {
            article: {
                [1899]: {
                    name,
                    s
                }
            },
            rate: upFirm == 1 ? 100 : rate
        }
    },
    4: function (firm) {
        const exp = 75000000 + 75000000 * firm / 2;
        const upFirm = firm + 1;
        let rate = 100 - upFirm * 10;
        if (upFirm > 7) {
            rate -= (upFirm - 5) * 5;
        }
        if (upFirm > 12) {
            rate = 5 - (upFirm - 12)
        }
        return {
            exp,
            rate: upFirm == 1 ? 100 : rate
        }
    },

}
module.exports = {
    /**
     * 装备强化 
     * @param req.materialtype 材料类型(1:强化卡,2:月光石,3:强化石,4:经验)
     * @param req.in_x 装备在背包内的下标
     */
    firmeEquip: (req, res) => {
        const { uid, materialtype } = req.body;
        if (!materialtype || !uid) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const in_x = data.findIndex((itme) => itme.uid === uid);
        const equip = data[in_x] || {};
        if (!knapsackTable.isEquip(equip.id)) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }

        const [firm_s, ...exts] = equip['ext'].split('_');
        if (firm_s == 16) {
            res.send({
                code: 0,
                message: '强化已到最大级,无法继续强化.'
            })
            return;
        }

        let firm = Number(firm_s);
        const { exp, article, rate } = materialIdMap[materialtype](firm);
        let isFirm = false;
        let result = {
            data,
            delInx: []
        };
        if (article) {
            isFirm = true;
            const { message, data: chengData, delInx } = knapsackFn.deleteKnapsack(req, res, article);
            if (message) {
                res.send({
                    code: 0,
                    message: message
                })
                return;
            }
            result = {
                data: chengData,
                delInx
            }
        }

        if (exp) {
            isFirm = true;
            const { role_exp } = RoleG.getRoleGlobal(req, res);
            const [c_exp, u_exp] = role_exp.split('/');
            if (c_exp < exp) {
                res.send({
                    code: 0,
                    message: '经验不足'
                })
                return;
            }
            RoleG.updataRoleGlobal(req, res, { role_exp: `${c_exp - exp}/${u_exp}` });
        }

        if (isFirm) {
            let num = Math.floor(Math.random() * (100 - 0)) + 1;
            let isOk = rate === 100 || rate >= num;
            firm = isOk ? firm + 1 : firm - 1;
            const ext = [firm, ...exts].join('_');
            const { delInx, data: newData } = result;
            let index = in_x;
            // 判断是否有消耗为空的材料,且排在该装备前面，是则需要减少下标
            index -= delInx.filter((del_x) => del_x < in_x).length
            // 更新强化等级
            newData[index]['ext'] = ext;
            KnapsackG.updateknapsackGlobal(req, res, { data: newData });
            res.send({
                code: 0,
                data: index,
                text: isOk ? '强化成功' : '强化失败',
            })
        }
    }
};
