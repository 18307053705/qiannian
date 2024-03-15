// 境界:凡境1，淬体1.2，星元1.5，紫府2，造化2.5，涅槃3，生死3.5，灵海4，彼岸5，神轮6，黄庭7，鸿蒙8,道境10
const realmMeun = {
    0: {
        id: 0,
        name: '凡人境',
        attr: 1,
        ele: 0,
        potential: 0,
    },
    1: {
        id: 1,
        name: '淬体初期',
        attr: 1.2,
        ele: 50,
        potential: 10,
        condition: {
            level: 10,
            tael: 5000,
            article: '201-10,209-10,2017-10'
        }
    },
    2: {
        id: 2,
        name: '淬体中期',
        attr: 1.2,
        ele: 25,
        potential: 5,
        condition: {
            level: 12,
            tael: 5000,
            article: '201-5,209-5,2017-5'
        }
    },
    3: {
        id: 3,
        name: '淬体后期',
        attr: 1.2,
        ele: 30,
        potential: 6,
        condition: {
            level: 15,
            tael: 5000,
            article: '201-5,209-5,2017-5'
        }
    },
    4: {
        id: 4,
        name: '淬体巅峰',
        attr: 1.2,
        ele: 35,
        potential: 7,
        condition: {
            level: 18,
            tael: 5000,
            article: '201-5,209-5,2017-5'
        }
    },
    5: {
        id: 5,
        name: '筑基初期',
        attr: 1.5,
        ele: 100,
        potential: 20,
        condition: {
            level: 30,
            tael: 10000,
            article: '202-20,2010-20,2018-20'
        }
        
    },
    6: {
        id: 6,
        name: '筑基中期',
        attr: 1.5,
        ele: 50,
        potential: 10,
        condition: {
            level: 35,
            tael: 20000,
            article: '202-10,2010-10,2018-10'
        }
    },
    7: {
        id: 7,
        name: '筑基后期',
        attr: 1.5,
        ele: 60,
        potential: 12,
        condition: {
            level: 40,
            tael: 30000,
            article: '202-10,2010-10,2018-10'
        }
    },
    8: {
        id: 8,
        name: '筑基巅峰',
        attr: 1.5,
        ele: 75,
        potential: 15,
        condition: {
            level: 45,
            tael: 50000,
            article: '202-10,2010-10,2018-10'
        }
    },
    9: {
        id: 9,
        name: '造化初期',
        attr: 2,
        ele: 300,
        potential: 30,
        condition: {
            level: 50,
            tael: 100000,
            article: '203-40,2011-40,2019-40'
        }
    },
    10: {
        id: 10,
        name: '造化中期',
        attr: 2,
        ele: 150,
        potential: 15,
        condition: {
            level: 52,
            tael: 200000,
            article: '203-20,2011-20,2019-20'
        }
    },
    11: {
        id: 11,
        name: '造化后期',
        attr: 2,
        ele: 180,
        potential: 20,
        condition: {
            level: 54,
            tael: 300000,
            article: '203-20,2011-20,2019-20'
        }
    },
    12: {
        id: 12,
        name: '造化巅峰',
        attr: 2,
        ele: 240,
        potential: 25,
        condition: {
            level: 56,
            tael: 500000,
            article: '203-20,2011-20,2019-20'
        }
    },
    13: {
        id: 13,
        name: '涅槃初期',
        attr: 2.5,
        ele: 500,
        potential: 40,
        condition: {
            level: 60,
            tael: 1000000,
            article: '203-400,2011-400,2019-400'
        }
    },
    14: {
        id: 14,
        name: '涅槃中期',
        attr: 2.5,
        ele: 250,
        potential: 20,
        condition: {
            level: 62,
            tael: 1200000,
            article: '203-200,2011-200,2019-200'
        }
    },
    15: {
        id: 15,
        name: '涅槃后期',
        attr: 2.5,
        ele: 300,
        potential: 25,
        condition: {
            level: 65,
            tael: 1200000,
            article: '203-200,2011-200,2019-200'
        }
    },
    16: {
        id: 16,
        name: '涅槃巅峰',
        attr: 2.5,
        ele: 350,
        potential: 30,
        condition: {
            level: 68,
            tael: 1200000,
            article: '203-200,2011-200,2019-200'
        }
    },
    17: {
        id: 17,
        name: '灵海初期',
        attr: 3,
        ele: 700,
        potential: 50,
        condition: {
            level: 70,
            tael: 2000000,
            article: '204-80,2012-80,2020-80'
        }
    },
    18: {
        id: 18,
        name: '灵海中期',
        attr: 3,
        ele: 350,
        potential: 25,
        condition: {
            level: 70,
            tael: 2000000,
            article: '204-40,2012-40,2020-40'
        }
    },
    19: {
        id: 19,
        name: '灵海后期',
        attr: 3,
        ele: 400,
        potential: 30,
        condition: {
            level: 72,
            tael: 2000000,
            article: '204-40,2012-40,2020-40'
        }
    },
    20: {
        id: 20,
        name: '灵海巅峰',
        attr: 3,
        ele: 500,
        potential: 35,
        condition: {
            level: 72,
            tael: 2000000,
            article: '204-40,2012-40,2020-40'
        }
    },
    21: {
        id: 21,
        name: '彼岸初期',
        attr: 3.5,
        ele: 1000,
        potential: 70,
        condition: {
            level: 75,
            tael: 3000000,
            article: '204-300,2012-300,2020-300'
        }
    },
    22: {
        id: 22,
        name: '彼岸中期',
        attr: 3.5,
        ele: 500,
        potential: 35,
        condition: {
            level: 75,
            tael: 3000000,
            article: '204-150,2012-150,2020-150'
        }
    },
    23: {
        id: 23,
        name: '彼岸后期',
        attr: 3.5,
        ele: 600,
        potential: 50,
        condition: {
            level: 78,
            tael: 3000000,
            article: '204-150,2012-150,2020-150'
        }
    },
    24: {
        id: 24,
        name: '彼岸巅峰',
        attr: 3.5,
        ele: 700,
        potential: 60,
        condition: {
            level: 78,
            tael: 3000000,
            article: '204-150,2012-150,2020-150'
        }
    },
    25: {
        id: 25,
        name: '神轮初期',
        attr: 4,
        ele: 1500,
        potential: 100,
        condition: {
            level: 80,
            tael: 5000000,
            article: '205-160,2013-160,2021-160'
        }
    },
    26: {
        id: 26,
        name: '神轮中期',
        attr: 4,
        ele: 750,
        potential: 50,
        condition: {
            level: 82,
            tael: 5000000,
            article: '205-160,2013-160,2021-160'
        }
    },
    27: {
        id: 27,
        name: '神轮后期',
        attr: 4,
        ele: 1000,
        potential: 70,
        condition: {
            level: 85,
            tael: 5000000,
            article: '205-160,2013-160,2021-160'
        }
    },
    28: {
        id: 28,
        name: '神轮巅峰',
        attr: 4,
        ele: 1250,
        potential: 80,
        condition: {
            level: 88,
            tael: 5000000,
            article: '205-160,2013-160,2021-160'
        }
    },
    29: {
        id: 29,
        name: '超凡初期',
        attr: 5,
        ele: 3000,
        potential: 150,
        condition: {
            level: 90,
            tael: 5000000,
            article: '206-320,2014-320,2022-320'
        }
    },
    30: {
        id: 30,
        name: '超凡中期',
        attr: 5,
        ele: 1500,
        potential: 75,
        condition: {
            level: 91,
            tael: 5000000,
            article: '206-160,2014-160,2022-160'
        }
    },
    31: {
        id: 31,
        name: '超凡后期',
        attr: 5,
        ele: 2000,
        potential: 100,
        condition: {
            level: 92,
            tael: 5000000,
            article: '206-160,2014-160,2022-160'
        }
    },
    32: {
        id: 32,
        name: '超凡巅峰',
        attr: 5,
        ele: 2500,
        potential: 125,
        condition: {
            level: 95,
            tael: 5000000,
            article: '206-160,2014-160,2022-160'
        }
    },
    33: {
        id: 33,
        name: '至尊初期',
        attr: 6,
        ele: 5000,
        potential: 300,
        condition: {
            level: 96,
            tael: 5000000,
            article: '206-640,2014-640,2022-640,2056-10,2057-10,2058-10,2059-10,2060-10'
        }
    },
    34: {
        id: 34,
        name: '至尊中期',
        attr: 6,
        ele: 2500,
        potential: 150,
        condition: {
            level: 97,
            tael: 5000000,
            article: '206-640,2014-640,2022-640,2056-10,2057-10,2058-10,2059-10,2060-10'
        }
    },
    35: {
        id: 35,
        name: '至尊后期',
        attr: 6,
        ele: 3000,
        potential: 180,
        condition: {
            level: 98,
            tael: 5000000,
            article: '206-640,2014-640,2022-640,2056-10,2057-10,2058-10,2059-10,2060-10'
        }
    },
    36: {
        id: 36,
        name: '至尊巅峰',
        attr: 6,
        ele: 3500,
        potential: 240,
        condition: {
            level: 99,
            tael: 5000000,
            article: '206-640,2014-640,2022-640,2056-10,2057-10,2058-10,2059-10,2060-10'
        }
    },
    37: {
        id: 37,
        name: '黄庭初期',
        attr: 7,
        ele: 7000,
        potential: 500,
        condition: {
            level: 100,
            tael: 10000000,
            article: '207-1000,2015-1000,2023-1000,2056-50,2057-50,2058-50,2059-50,2060-50'
        }
    },
    38: {
        id: 38,
        name: '黄庭中期',
        attr: 7,
        ele: 3500,
        potential: 250,
        condition: {
            level: 101,
            tael: 10000000,
            article: '207-1000,2015-1000,2023-1000,2056-50,2057-50,2058-50,2059-50,2060-50'
        }
    },
    39: {
        id: 39,
        name: '黄庭后期',
        attr: 7,
        ele: 4000,
        potential: 300,
        condition: {
            level: 102,
            tael: 10000000,
            article: '207-1000,2015-1000,2023-1000,2056-50,2057-50,2058-50,2059-50,2060-50'
        }
    },
    40: {
        id: 40,
        name: '黄庭巅峰',
        attr: 7,
        ele: 5000,
        potential: 400,
        condition: {
            level: 105,
            tael: 10000000,
            article: '207-1000,2015-1000,2023-1000,2056-50,2057-50,2058-50,2059-50,2060-50'
        }
    },
    41: {
        id: 41,
        name: '鸿蒙初期',
        attr: 8,
        ele: 10000,
        potential: 1000,
        condition: {
            level: 106,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-100,2057-100,2058-100,2059-100,2060-100'
        }
    },
    42: {
        id: 42,
        name: '鸿蒙中期',
        attr: 8,
        ele: 5000,
        potential: 500,
        condition: {
            level: 107,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-100,2057-100,2058-100,2059-100,2060-100'
        }
    },
    43: {
        id: 43,
        name: '鸿蒙后期',
        attr: 8,
        ele: 6000,
        potential: 650,
        condition: {
            level: 108,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-100,2057-100,2058-100,2059-100,2060-100'
        }
    },
    44: {
        id: 44,
        name: '鸿蒙巅峰',
        attr: 8,
        ele: 7000,
        potential: 800,
        condition: {
            level: 109,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-100,2057-100,2058-100,2059-100,2060-100'
        }
    },
    45: {
        id: 45,
        name: '道境初期',
        attr: 10,
        ele: 20000,
        potential: 3000,
        condition: {
            level: 110,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-200,2057-200,2058-200,2059-200,2060-200'
        }
    },
    46: {
        id: 46,
        name: '道境中期',
        attr: 10,
        ele: 10000,
        potential: 1500,
        condition: {
            level: 115,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-200,2057-200,2058-200,2059-200,2060-200'
        }
    },
    47: {
        id: 47,
        name: '道境后期',
        attr: 10,
        ele: 12000,
        potential: 2000,
        condition: {
            level: 120,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-200,2057-200,2058-200,2059-200,2060-200'
        }
    },
    48: {
        id: 48,
        name: '道境巅峰',
        attr: 10,
        ele: 15000,
        potential: 2500,
        condition: {
            level: 120,
            tael: 10000000,
            article: '207-1200,2015-1200,2023-1200,2056-200,2057-200,2058-200,2059-200,2060-200'
        }
    }
}
module.exports = {
    ...realmMeun
}
