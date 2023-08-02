const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 获取角色全局信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 可选参数
     * @param {*} data.role_id 角色id
     * @param {*} data.attr 需要的属性
     * @returns {*} role | undefined
     * @returns {*} user_id:账号
     * @returns {*} role_id:角色id
     * @returns {*} role_name:角色名称
     * @returns {*} role_race:种族(1人2妖3仙)
     * @returns {*} role_career:职业(1法皇2战尊3羽圣4血煞5战狂6赤魅7星君8战神9剑仙)
     * @returns {*} role_sex:性别(男,女)
     * @returns {*} role_level:角色等级
     * @returns {*} role_exp:经验
     * @returns {*} role_realm:境界
     * @returns {*} role_title:称号
     * @returns {*} life:血量
     * @returns {*} mana:法力
     * @returns {*} address:位置
     * @returns {*} equip_pool:装备池({ weapon：武器,helmet：头部, clothing：衣服, weapon：腰带, shoe：鞋子,ring：戒指,necklace：项链,treasure1：法宝1,treasure2：法宝2,treasure3：法宝3,treasure4：法宝4})
     * @returns {*} socialize_pool:势力池({gang(帮会):{nam:名称,id},gang(庄园):{nam:名称,id},gang(队伍):{nam:名称,id}})
     * @returns {*} skill_pool:技能与战斗设置({art(技能池):[],fight(战斗设置):[]})
     * @returns {*} task_pool:当前任务
     * @returns {*} can_task_pool:可接任务
     * @returns {*} role_attr:角色属性({base:基础属性，addition额外属性(装备，宠物，丹药，潜力，境界，vip)})
     * @returns {*} role_buff:buff池({"attr":{ e:effect,d:结束时间  },"vip":{ key:id,d:结束时间  }})
     * @returns {*} role_integral:各类积分
     * @returns {*} pet_pool:宠物池({c:当前宠物信息(id,n,攻击，暴击，命中,s:状态0:休息1:出战，2附体3上架，技能,id,l,r,),l:宠物房列表id,n,s  x:宠物房最大空间})
     * @returns {*} treasure_pool:聚宝盆，珍宝房屋({fw房屋:{exp:10000000,ext:10_10_10_10_10_10_10,g:0},xz勋章:1000000,hb徽标:10000000,lp令牌:10000000,jbp: 聚宝盆00000})
     * @returns {*} role_lx: 灵血
     */
    getRoleGlobal: function (req, res, { role_id, attr } = {}) {
        const user = req.cookies["q_uid"];
        let role = undefined;
        // 获取其他玩家信息
        if (role_id) {
            const userKey = Object.keys(ROLE_Global).find((key) => ROLE_Global[key].role_id === role_id);
            role = userKey ? ROLE_Global[userKey] : undefined
        } else {
            role = ROLE_Global[user];
        }
        return role ? JSON.parse(JSON.stringify(role)) : undefined;
    }

}