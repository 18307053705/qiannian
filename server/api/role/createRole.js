const { ErrorG, RoleG, KnapsackG } = require('../../global');
const { AttributeTable } = require('../../table');
const { roleFn } = require('../../utils');
const MEUN = require('../../meun');
module.exports = {
    /**
     * 创建角色
     */
    createRole: async (req, res) => {
        const user = req.cookies["q_uid"];
        const { role_name, role_sex, role_career, role_race } = req.body;
        const { results } = await res.asyncQuery(`select * from role  where role_name="${role_name}"`);
        if (results[0]) {
            return res.send({
                code: 0,
                message: '角色名重复'
            })
        }
        const { results: RoleList } = await res.asyncQuery(`select * from role  where user_id="${user}"`);
        // 数量已满,无法继续创建
        if (RoleList.length === 3) {
            return ErrorG.unknownError(res);
        }
        // 开始创建角色
        // 基础属性
        const attr = AttributeTable.getRoleBaseAttr(role_career);
        // 坐标
        const address = MEUN.ADDRESS_MEUN[role_race];
        // 角色id
        const role_id = `${user}_${results.length + 1}`;
        const roleInfo = {
            user_id: user,
            role_id,
            role_name,
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
                base: attr,
                addition: AttributeTable.getInitAttr(),
            },
            role_buff: {
                attr: [],
                vip: {}
            },
            address,
            role_evil: 0,
            role_signature: '',
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
            task_pool: {
                main: []
            },
            can_task_pool: {
                main: [1]
            },
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
            }
        }
        // 角色信息
        const keys = [];
        const value = [];
        const insert = [];
        Object.keys(roleInfo).forEach((key) => {
            keys.push(key);
            value.push(typeof roleInfo[key] === 'object' ? JSON.stringify(roleInfo[key]) : roleInfo[key]);
            insert.push('?');
        })
        const roleSql = `insert into role(${keys.join(',')}) values(${insert.join(',')})`;
        const roleRes = res.asyncAdd(roleSql, value);
        //  背包
        const knapsackSql = "insert into knapsack(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const knapsackData = [user, role_id, 1000, 0, '[]', '{}'];
        const knapsackRes = res.asyncAdd(knapsackSql, knapsackData);
        //  仓库
        const warehouseSql = "insert into warehouse(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const warehouseData = [user, role_id, 0, 0, '[]'];
        const warehouseRes = res.asyncAdd(warehouseSql, warehouseData);
        //  好友
        const friendsSql = "insert into friends(user_id,role_id,list,apply) values(?,?,?,?)";
        const friendsData = [user, role_id, '[]', '[]'];
        const friendsRes = res.asyncAdd(friendsSql, friendsData);
        await Promise.all([roleRes, knapsackRes, warehouseRes, friendsRes]);
        // 退出同账号下的其他角色
        await roleFn.roleExit(req, res);
        // 保存全局角色信息,并且记录登录时间
        RoleG.setRoleGlobal(req, res, sqlInfo);
        // 保存全局背包信息
        KnapsackG.setknapsackGlobal(req, res, { user_id: user, role_id, yuanbao: 1000, yuanbao: 0, data: '[]' });

        // Global.setSocializeGlobal(req);
        // 初始化任务池
        // taskFn.initTask(req);
        res.send({
            code: 0,
            data: {
                role_race,
                role_name
            }
        })

    }
};