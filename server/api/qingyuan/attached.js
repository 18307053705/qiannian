const { roleFn, qingyuanFn } = require('../../utils');
const { ChatG } = require("../../global");
const { knapsackTable } = require('../../table');

function addYinYuanEquip(req, res, role_id) {
    const { data } = KnapsackG.getknapsackGlobal(req, res, role_id);
    const list = [141, 142, 143, 144, 145];
    list.forEach(id => {
        const { name } = knapsackTable.getEquip(id);
        data.push({
            id,
            n: name,
            p: 3,
            s: 1,
            ext: "0_0_0_0_0_0_0_0_0"
        })
    })
    KnapsackG.updateknapsackGlobal(req, res, { data }, role_id);
}


module.exports = {
    /**
     * 缔结姻缘
     *  @param {*} req.role_id
     *  @param {*} req.type (0:申请,1:同意,2:拒绝)
     */
    attached: async function (req, res) {
        const { role_id, type } = req.body;
        if (![0, 1, 2].includes(type) || !role_id) {
            ErrorG.paramsError(res);
            return;
        }
        const iRole = RoleG.getRoleGlobal(req, res);
        const tRole = RoleG.getRoleGlobal(req, res, { role_id });
        // 非拒绝操作，对方必须在线
        if (type !== 2 && !tRole) {
            res.send({
                code: 0,
                message: '对方未在线，无法结缘。'
            })
            return;
        }
        const { address: iAddress, role_sex: iSex, qingyuan: iQingYuan, role_id: iRoleId, role_name: iRoleName, address } = iRole;
        const { address: tAddress, role_sex: tSex, qingyuan: tQingYuan, role_id: tRoleId, role_name: tRoleName } = tRole;
        // 非拒绝操作，双方位置必须一致
        if (type !== 2 && tAddress !== iAddress) {
            res.send({
                code: 0,
                message: '对方不在姻缘石附近，无法结缘。'
            })
            return;
        }
        // 申请校验
        if (type === 0 && iSex === tSex) {
            res.send({
                code: 0,
                message: '性别一致，无法结缘。'
            })
            return;
        }

        // 申请校验
        if (type === 0 && (iQingYuan.role || iQingYuan.d || tQingYuan.role || tQingYuan.d)) {
            res.send({
                code: 0,
                message: '对方已存在结缘，无法结缘。'
            })
            return;
        }

        // 同意校验,自己的申请无法同意自己
        if (type === 1 && iQingYuan.role.i) {
            res.send({
                code: 0,
                message: '请等待对方确定。'
            })
            return;
        }

        // 申请结缘
        if (type === 0) {
            iQingYuan.role = {
                n: tRoleName,
                r_id: tRoleId,
                i: 1
            };
            tQingYuan.role = {
                n: iRoleName,
                r_id: iRoleId,
            };
            RoleG.updataRoleGlobal(req, res, { qingyuan: iQingYuan });
            RoleG.updataRoleGlobal(req, res, { qingyuan: tQingYuan }, { role_id: tRoleId });
            res.send({
                code: 0,
                data: {
                    role: iQingYuan.role,
                    iRole,
                    tRole
                },
                success: '申请结缘成功，请等待对方确定。'
            })
            return;
        }
        // 同意结缘
        if (type === 1) {
            const qingyuan = {
                role1: iRoleId,
                role2: tRoleId,
                name1: iRoleName,
                name2: tRoleName,
                level: 1,
                exp: '0/100',
                causality: 0
            }
            const results = await qingyuanFn.insertQingYuan(req, res, qingyuan)
            const id = results.insertId;
            const iS = iQingYuan.s || 0;
            const tS = tQingYuan.s || 0;
            RoleG.updataRoleGlobal(req, res, { qingyuan: { d: { id, rId: tRoleId, n: tRoleName }, s: iS + 1 } });
            RoleG.updataRoleGlobal(req, res, { qingyuan: { d: { id, rId: iRoleId, n: iRoleName }, s: tS + 1 } }, { role_id: tRoleId });
            ChatG.sendChat(req, res, 0, `恭喜玩家${iRoleName}与${tRoleName}喜结良缘，大家快去恭喜他们吧！！`);
            if (!iS) {
                addYinYuanEquip(req, res);
                ChatG.sendChat(req, res, 0, `恭喜玩家${iRoleName}与${tRoleName}喜结良缘，获得：天定姻缘套装，大家快去恭喜他们吧！！`);
            }
            if (!tS) {
                addYinYuanEquip(req, res, tRoleId);
                ChatG.sendChat(req, res, 0, `恭喜玩家${tRoleName}与${iRoleName}喜结良缘，获得：天定姻缘套装，大家快去恭喜他们吧！！`);
            }
            res.send({
                code: 0,
                data: {
                    qingYuan: {
                        info: qingyuan,
                        role_id: iRoleId
                    }
                }
            })
            return;
        }
        // 拒绝或撤销结缘
        if (type === 2) {
            delete iQingYuan.role;
            delete iQingYuan.i;
            // 拒绝撤销结缘，对方可不在线，所有此处需额外判断
            if (!tRole) {
                const { qingyuan: tQingYuans } = await roleFn.getRoleInfo(req, res, { role_id });
                delete tQingYuans.role;
                delete tQingYuans.i;
            } else {
                delete tQingYuan.role;
                delete tQingYuan.i;
            }
            RoleG.updataRoleGlobal(req, res, { qingyuan: iQingYuan });
            await roleFn.updataRoleInfo(req, res, { qingyuan: tRole ? tQingYuan : tQingYuans }, role_id);
            // 可申请情缘列表
            const players = await roleFn.getAddressPlayers(req, res, address);
            const list = [];
            players.forEach(({ role_sex, role_id, role_name }) => {
                if (iSex !== role_sex) {
                    list.push({
                        role_id,
                        role_name
                    })
                }
            })
            res.send({
                code: 0,
                data: {
                    player: list,
                }
            })
            return;
        }

    }
}
