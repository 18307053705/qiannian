// 境界:凡境1，淬体1.2，星元1.5，紫府2，造化2.5，涅槃3，生死3.5，灵海4，彼岸5，神轮6，黄庭7，鸿蒙8,道境10
const realmMeun = {
    0: {
        id: 0,
        name: '凡人境',
        attr: 1,
        ele: 0,
        potential: 0
    },
    1: {
        id: 1,
        name: '淬体初期',
        attr: 1.2,
        ele: 50,
        potential: 10
    },
    2: {
        id: 2,
        name: '淬体中期',
        attr: 1.2,
        ele: 25,
        potential: 5
    },
    3: {
        id: 3,
        name: '淬体后期',
        attr: 1.2,
        ele: 30,
        potential: 6
    },
    4: {
        id: 4,
        name: '淬体巅峰',
        attr: 1.2,
        ele: 35,
        potential: 7
    },
    5: {
        id: 5,
        name: '筑基初期',
        attr: 1.5,
        ele: 100,
        potential: 20
    },
    6: {
        id: 6,
        name: '筑基中期',
        attr: 1.5,
        ele: 50,
        potential: 10
    },
    7: {
        id: 7,
        name: '筑基后期',
        attr: 1.5,
        ele: 60,
        potential: 12
    },
    8: {
        id: 8,
        name: '筑基巅峰',
        attr: 1.5,
        ele: 75,
        potential: 15
    },
    9: {
        id: 9,
        name: '造化初期',
        attr: 2,
        ele: 300,
        potential: 30
    },
    10: {
        id: 10,
        name: '造化中期',
        attr: 2,
        ele: 150,
        potential: 15
    },
    11: {
        id: 11,
        name: '造化后期',
        attr: 2,
        ele: 180,
        potential: 20
    },
    12: {
        id: 12,
        name: '造化巅峰',
        attr: 2,
        ele: 240,
        potential: 25
    },
    13: {
        id: 13,
        name: '涅槃初期',
        attr: 2.5,
        ele: 500,
        potential: 40
    },
    14: {
        id: 14,
        name: '涅槃中期',
        attr: 2.5,
        ele: 250,
        potential: 20
    },
    15: {
        id: 15,
        name: '涅槃后期',
        attr: 2.5,
        ele: 300,
        potential: 25
    },
    16: {
        id: 16,
        name: '涅槃巅峰',
        attr: 2.5,
        ele: 350,
        potential: 30
    },
    17: {
        id: 17,
        name: '灵海初期',
        attr: 3,
        ele: 700,
        potential: 50
    },
    18: {
        id: 18,
        name: '灵海中期',
        attr: 3,
        ele: 350,
        potential: 25
    },
    19: {
        id: 19,
        name: '灵海后期',
        attr: 3,
        ele: 400,
        potential: 30
    },
    20: {
        id: 20,
        name: '灵海巅峰',
        attr: 3,
        ele: 500,
        potential: 35
    },
    21: {
        id: 21,
        name: '彼岸初期',
        attr: 3.5,
        ele: 1000,
        potential: 70
    },
    22: {
        id: 22,
        name: '彼岸中期',
        attr: 3.5,
        ele: 500,
        potential: 35
    },
    23: {
        id: 23,
        name: '彼岸后期',
        attr: 3.5,
        ele: 600,
        potential: 50
    },
    24: {
        id: 24,
        name: '彼岸巅峰',
        attr: 3.5,
        ele: 700,
        potential: 60
    },
    25: {
        id: 25,
        name: '神轮初期',
        attr: 4,
        ele: 1500,
        potential: 100
    },
    26: {
        id: 26,
        name: '神轮中期',
        attr: 4,
        ele: 750,
        potential: 50
    },
    27: {
        id: 27,
        name: '神轮后期',
        attr: 4,
        ele: 1000,
        potential: 70
    },
    28: {
        id: 28,
        name: '神轮巅峰',
        attr: 4,
        ele: 1250,
        potential: 80
    },
    29: {
        id: 29,
        name: '超凡初期',
        attr: 5,
        ele: 3000,
        potential: 150
    },
    30: {
        id: 30,
        name: '超凡中期',
        attr: 5,
        ele: 1500,
        potential: 75
    },
    31: {
        id: 31,
        name: '超凡后期',
        attr: 5,
        ele: 2000,
        potential: 100
    },
    32: {
        id: 32,
        name: '超凡巅峰',
        attr: 5,
        ele: 2500,
        potential: 125
    },
    33: {
        id: 33,
        name: '至尊初期',
        attr: 6,
        ele: 5000,
        potential: 300
    },
    34: {
        id: 34,
        name: '至尊中期',
        attr: 6,
        ele: 2500,
        potential: 150
    },
    35: {
        id: 35,
        name: '至尊后期',
        attr: 6,
        ele: 3000,
        potential: 180
    },
    36: {
        id: 36,
        name: '至尊巅峰',
        attr: 6,
        ele: 3500,
        potential: 240
    },
    37: {
        id: 37,
        name: '黄庭初期',
        attr: 7,
        ele: 7000,
        potential: 500
    },
    38: {
        id: 38,
        name: '黄庭中期',
        attr: 7,
        ele: 3500,
        potential: 250
    },
    39: {
        id: 39,
        name: '黄庭后期',
        attr: 7,
        ele: 4000,
        potential: 300
    },
    40: {
        id: 40,
        name: '黄庭巅峰',
        attr: 7,
        ele: 5000,
        potential: 400
    },
    41: {
        id: 41,
        name: '鸿蒙初期',
        attr: 8,
        ele: 10000,
        potential: 1000
    },
    42: {
        id: 42,
        name: '鸿蒙中期',
        attr: 8,
        ele: 5000,
        potential: 500
    },
    43: {
        id: 43,
        name: '鸿蒙后期',
        attr: 8,
        ele: 6000,
        potential: 650
    },
    44: {
        id: 44,
        name: '鸿蒙巅峰',
        attr: 8,
        ele: 7000,
        potential: 800
    },
    45: {
        id: 45,
        name: '道境初期',
        attr: 10,
        ele: 20000,
        potential: 3000
    },
    46: {
        id: 46,
        name: '道境中期',
        attr: 10,
        ele: 10000,
        potential: 1500
    },
    47: {
        id: 47,
        name: '道境后期',
        attr: 10,
        ele: 12000,
        potential: 2000
    },
    48: {
        id: 48,
        name: '道境巅峰',
        attr: 10,
        ele: 15000,
        potential: 2500
    }
}
module.exports = {
    ...realmMeun
}
