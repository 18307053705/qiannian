const { RoleSql, KnapsackSql, WarehouseSql, FriendsSql } = require('@/mysql');
const AttrSystem = require('@/system/AttrSystem');
const { AttributeTable } = require('@/table');
const { roleFn } = require('@/utils');
const { REGION_EUNM } = require('@/meun');

module.exports = {
    /**
     * 创建角色
     */
    createRole: async (req, res) => {
        const user = req.cookies["q_uid"];
        const region = req.cookies["region"];
        if (!REGION_EUNM[region]) {
            res.send({
                code: 0,
                message: '大区异常'
            })
            return;
        }

        const { role_name, role_sex, role_career, role_race } = req.body;
        const isName = await RoleSql.asyncGetRoleName(req, res, role_name);
        if (isName) {
            res.send({
                code: 0,
                message: '角色名重复'
            })
            return;
        }

        const RoleList = await roleSql.asyncGetRoleList(req, res) || [];
        let ids = [`${user}_${region}1`, `${user}_${region}2`, `${user}_${region}3`];
        RoleList.forEach(({ role_id }) => {
            ids = ids.filter((id) => role_id !== id)
        })
        // 数量已满,无法继续创建
        if (!ids.length) {
            res.send({
                code: 0,
                message: '该账号可注册角色已满'
            })
            return;
        }
        const attr = AttrSystem.getRoleBaseAttr(role_career);
        const role_id = ids[0];
        const roleInfo = {
            user_id: user,
            role_id,
            role_name,
            region,
            role_race,
            role_career,
            role_sex,
            role_level: 1,
            role_exp: '0/200',
            role_realm: 1,
            role_title: 0,
            role_lx: 0,
            life: attr.life,
            mana: attr.mana,
            role_attr: {
                addition: AttributeTable.getInitAttr(),
                qian_li: 0,
                max_qian_li: 0,
                potential: {
                    ti_zhi: 0,
                    geng_gu: 0,
                    bi_li: 0,
                    nai_li: 0,
                    shen_fa: 0,
                },
            },
            role_buff: {
                attr: [],
                vip: {}
            },
            address: '10000,0,0',
            socialize_pool: {},
            equip_pool: {},
            skill_pool: {
                art: {},
                fight: [
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 0, n: '普通攻击' },
                    { id: 1, n: '放弃战斗', p: 9 },
                    { id: 2, n: '御宠之术', p: 9 },
                ]
            },
            task_pool: [{ id: 100, p: 1 }],
            role_integral: {},
            pet_pool: {
                c: {},
                l: [],
                x: 4
            },
            treasure_pool: {
                fw: { exp: 0, ext: '0_0_0_0_0_0_0', s: 0, g: 0 },
                xz: { exp: 0, s: 0 },
                hb: { exp: 0, s: 0 },
                lp: { exp: 0, s: 0 },
                jbp: { exp: 0, l: 0, lx: 0, id: 0 },
            },
            jackpot: { equip: 0, pet: 0, art: 0, level: 0, invest: 0 },
            qingyuan: {},
            upper_limit: {}
        }
        
        // 角色信息
        const keys = [];
        const value = [];
        const insert = [];
        Object.keys(roleInfo).forEach((key) => {
            keys.push(key);
            if (typeof roleInfo[key] === 'object') {
                roleInfo[key] = JSON.stringify(roleInfo[key]);
            }
            value.push(roleInfo[key]);
            insert.push('?');
        })
        await RoleSql.asyncInsertRole(roleInfo);
        await Promise.all([
            KnapsackSql.asyncAddKnapsack(user, role_id),
            WarehouseSql.asyncAddWarehouse(user, role_id),
            FriendsSql.asyncAddFriends(user, role_id)]
        );
        await roleFn.roleLogin(req, res, roleInfo, { user_id: user, role_id, tael: 1000, yuanbao: 0, data: '[]' });
        res.send({
            code: 0,
            data: '创建角色成功'
        })
    }
};