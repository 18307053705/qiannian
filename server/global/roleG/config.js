// 角色表结构
// CREATE TABLE `role` (
//     `id` int NOT NULL AUTO_INCREMENT,
//     `user_id` char(12) DEFAULT NULL COMMENT '账号',
//     `role_id` char(15) DEFAULT NULL COMMENT '角色id',
//     `role_name` varchar(8) DEFAULT NULL COMMENT '角色名称',
//     `role_race` int DEFAULT NULL COMMENT '种族',
//     `role_career` int DEFAULT NULL COMMENT '职业：1法皇2战尊3羽圣4血煞5战狂6赤魅7星君8战神9剑仙',
//     `role_sex` varchar(1) DEFAULT NULL COMMENT '性别',
//     `role_level` int DEFAULT NULL COMMENT '角色等级',
//     `role_exp` varchar(30) DEFAULT NULL COMMENT '经验',
//     `role_realm` int DEFAULT NULL COMMENT '境界',
//     `role_title` int DEFAULT NULL COMMENT '称号',
//     `life` int DEFAULT NULL COMMENT '血量',
//     `mana` int NOT NULL COMMENT '法力',
//     `address` varchar(20) DEFAULT NULL COMMENT '位置',
//     `role_evil` varchar(45) DEFAULT NULL COMMENT '红名',
//     `role_signature` varchar(45) DEFAULT NULL COMMENT '个性签名',
//     `equip_pool` varchar(800) DEFAULT NULL COMMENT '装备池：{ weapon：武器,helmet：头部, clothing：衣服, weapon：腰带, shoe：鞋子,ring：戒指,necklace：项链,treasure1：法宝1,treasure2：法宝2,treasure3：法宝3,treasure4：法宝4}',
//     `socialize_pool` varchar(1000) DEFAULT NULL COMMENT '{gang(帮会):{nam:名称,id},gang(庄园):{nam:名称,id},gang(队伍):{nam:名称,id}}',
//     `skill_pool` varchar(1000) DEFAULT NULL COMMENT '{art(技能池):[],fight(战斗设置):[]}',
//     `task_pool` varchar(100) DEFAULT NULL COMMENT '当前任务',
//     `can_task_pool` varchar(100) DEFAULT NULL COMMENT '可接任务',
//     `role_attr` varchar(800) DEFAULT NULL COMMENT '{base:基础属性，addition额外属性(装备，宠物，丹药，潜力，境界，vip)}\n',
//     `role_buff` varchar(2000) DEFAULT NULL COMMENT '{"attr":{ e:effect,d:结束时间  },"vip":{ key:id,d:结束时间  }}',
//     `role_integral` varchar(1000) DEFAULT NULL,
//     `pet_pool` varchar(1000) DEFAULT NULL COMMENT '{c:当前宠物信息(id,n,攻击，暴击，命中,s:状态0:休息1:出战，2附体3上架，技能,id,l,r,),l:宠物房列表id,n,s  x:宠物房最大空间}',
//     `treasure_pool` varchar(300) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '{fw房屋:{exp:10000000,ext:10_10_10_10_10_10_10,g:0},xz勋章:1000000,hb徽标:10000000,lp令牌:10000000,jbp: 聚宝盆00000}  ',
//     `role_lx` int unsigned DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `role_id_UNIQUE` (`role_id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/**
 * 角色信息JSON格式字段
 */
const ROLE_JSON_KEYS = [
    'equip_pool',
    'socialize_pool',
    'skill_pool',
    'base_pool',
    'addition_pool',
    'buff_pool',
    'reputation_pool',
    'task_pool',
    'can_task_pool',
    'role_attr',
    'role_buff',
    'pet_pool',
    'role_integral',
    'treasure_pool'
];

/**
 * 全局角色信息数据结构
 */
const ROLE_Global = {
    // key: { // 角色账号为key
    //     ...role,
    //     updateKeys: [] // 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    // }
}
module.exports = {
    ROLE_JSON_KEYS,
    ROLE_Global,
}