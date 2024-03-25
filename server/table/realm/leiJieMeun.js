// 境界:凡境1，淬体1.2，筑基1.5，造化2，涅槃2.5，灵海3，彼岸3.5，神轮4，超凡5，至尊6，黄庭7，鸿蒙8,道境10
const leiJieMeun = {
    1: {
        id: 1, // id
        name: '一九天劫', // 名称
        max: 9, // 次数
        level: 50, // 等级
        realm: 8 // 要求境界
    },
    2: {
        id: 2,
        name: '三九天劫',
        max: 36,
        level: 70,
        realm: 16
    },
    3: {
        id: 3,
        name: '六九天劫',
        max: 54,
        level: 80,
        realm: 24
    },
    4: {
        id: 4,
        name: '九九天劫',
        max: 81,
        level: 90,
        realm: 28
    },
    5: {
        id: 5,
        name: '至尊劫',
        max: 81,
        level: 95,
        realm: 32
    },
    6: {
        id: 6,
        name: '黄庭劫',
        max: 81,
        level: 100,
        realm: 36
    },
    7: {
        id: 7,
        name: '鸿蒙劫',
        max: 81,
        level: 120,
        realm: 40
    },
    8: {
        id: 8,
        name: '道境劫',
        max: 81,
        level: 150,
        realm: 44,
    },
    9: {
        id: 9,
        name: '紫霄劫',
        last: true, // 是否最后雷劫
        max: 81,
        level: 110,
        realm: 44,
    },
}
module.exports = {
    ...leiJieMeun
}
