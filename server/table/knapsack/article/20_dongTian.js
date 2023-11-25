const articleMap = {
    200: {
        name: '太阴石碎片',
        tips: '从太阴石矿中获取到的太阴石碎片，每100枚可合成1枚一阶太阴石。',
        level: 1,
    },
    201: {
        name: '一阶太阴石',
        tips: '从太阴石矿中获取到的一阶太阴石，每100枚可合成1枚二阶太阴石。',
        level: 1,
    },
    202: {
        name: '二阶太阴石',
        tips: '从太阴石矿中获取到的二阶太阴石，每100枚可合成1枚三阶太阴石。',
        level: 2,
    },
    203: {
        name: '三阶太阴石',
        tips: '从太阴石矿中获取到的三阶太阴石，每100枚可合成1枚四阶太阴石。',
        level: 3,
    },
    204: {
        name: '四阶太阴石',
        tips: '从太阴石矿中获取到的四阶太阴石，每100枚可合成1枚五阶太阴石。',
        level: 4,
    },
    205: {
        name: '五阶太阴石',
        tips: '从太阴石矿中获取到的五阶太阴石，每100枚可合成1枚六阶太阴石。',
        level: 5,
    },
    206: {
        name: '六阶太阴石',
        tips: '从太阴石矿中获取到的六阶太阴石，每100枚可合成1枚七阶太阴石。',
        level: 6,
    },
    207: {
        name: '七阶太阴石',
        tips: '从太阴石矿中获取到的七阶太阴石，蕴含纯粹的太阴道蕴。',
        level: 7,
    },
    208: {
        name: '太阳石碎片',
        tips: '从太阳石矿中获取到的太阳石碎片，每100枚可合成1枚一阶太阳石。',
        level: 1,
    },
    209: {
        name: '一阶太阳石',
        tips: '从太阳石矿中获取到的一阶太阳石，每100枚可合成1枚二阶太阳石。',
        level: 1,
    },
    2010: {
        name: '二阶太阳石',
        tips: '从太阳石矿中获取到的二阶太阳石，每100枚可合成1枚三阶太阳石。',
        level: 2,
    },
    2011: {
        name: '三阶太阳石',
        tips: '从太阳石矿中获取到的三阶太阳石，每100枚可合成1枚四阶太阳石。',
        level: 3,
    },
    2012: {
        name: '四阶太阳石',
        tips: '从太阳石矿中获取到的四阶太阳石，每100枚可合成1枚五阶太阳石。',
        level: 4,
    },
    2013: {
        name: '五阶太阳石',
        tips: '从太阳石矿中获取到的五阶太阳石，每100枚可合成1枚六阶太阳石。',
        level: 5,
    },
    2014: {
        name: '六阶太阳石',
        tips: '从太阳石矿中获取到的六阶太阳石，每100枚可合成1枚七阶太阳石。',
        level: 6,
    },
    2015: {
        name: '七阶太阳石',
        tips: '从太阳石矿中获取到的七阶太阳石，蕴含纯粹的太阳道蕴。',
        level: 7,
    },
    2016: {
        name: '造化石碎片',
        tips: '从造化石矿中获取到的造化石碎片，每100枚可合成1枚一阶造化石。',
        level: 1,
    },
    2017: {
        name: '一阶造化石',
        tips: '从造化石矿中获取到的一阶造化石，每100枚可合成1枚二阶造化石。',
        level: 1,
    },
    2018: {
        name: '二阶造化石',
        tips: '从造化石矿中获取到的二阶造化石，每100枚可合成1枚三阶造化石。',
        level: 2,
    },
    2019: {
        name: '三阶造化石',
        tips: '从造化石矿中获取到的三阶造化石，每100枚可合成1枚四阶造化石。',
        level: 3,
    },
    2020: {
        name: '四阶造化石',
        tips: '从造化石矿中获取到的四阶造化石，每100枚可合成1枚五阶造化石。',
        level: 4,
    },
    2021: {
        name: '五阶造化石',
        tips: '从造化石矿中获取到的五阶造化石，每100枚可合成1枚六阶造化石。',
        level: 5,
    },
    2022: {
        name: '六阶造化石',
        tips: '从造化石矿中获取到的六阶造化石，每100枚可合成1枚七阶造化石。',
        level: 6,
    },
    2023: {
        name: '七阶造化石',
        tips: '从造化石矿中获取到的七阶造化石，蕴含纯粹的造化道蕴。',
        level: 7,
    },
    2024: {
        name: '低劣凝血草',
        tips: '从凝血草圃中获取到的低劣凝血草，每100株可合成1株一阶凝血草。',
        level: 1,
    },
    2025: {
        name: '一阶凝血草',
        tips: '从凝血草圃中获取到的一阶凝血草，每100株可合成1株二阶凝血草。',
        level: 1,
    },
    2026: {
        name: '二阶凝血草',
        tips: '从凝血草圃中获取到的二阶凝血草，每100株可合成1株三阶凝血草。',
        level: 2,
    },
    2027: {
        name: '三阶凝血草',
        tips: '从凝血草圃中获取到的三阶凝血草，每100株可合成1株四阶凝血草。',
        level: 3,
    },
    2028: {
        name: '四阶凝血草',
        tips: '从凝血草圃中获取到的四阶凝血草，每100株可合成1株五阶凝血草。',
        level: 4,
    },
    2029: {
        name: '五阶凝血草',
        tips: '从凝血草圃中获取到的五阶凝血草，每100株可合成1株六阶凝血草。',
        level: 5,
    },
    2030: {
        name: '六阶凝血草',
        tips: '从凝血草圃中获取到的六阶凝血草，每100株可合成1株七阶凝血草。',
        level: 6,
    },
    2031: {
        name: '七阶凝血草',
        tips: '从凝血草圃中获取到的七阶凝血草，蕴含纯粹的气血道韵。',
        level: 7,
    },
    2032: {
        name: '低劣聚灵草',
        tips: '从聚灵草圃中获取到的低劣聚灵草，每100株可合成1株一阶聚灵草。',
        level: 1,
    },
    2033: {
        name: '一阶聚灵草',
        tips: '从聚灵草圃中获取到的一阶聚灵草，每100株可合成1株二阶聚灵草。',
        level: 1,
    },
    2034: {
        name: '二阶聚灵草',
        tips: '从聚灵草圃中获取到的二阶聚灵草，每100株可合成1株三阶聚灵草。',
        level: 2,
    },
    2035: {
        name: '三阶聚灵草',
        tips: '从聚灵草圃中获取到的三阶聚灵草，每100株可合成1株四阶聚灵草。',
        level: 3,
    },
    2036: {
        name: '四阶聚灵草',
        tips: '从聚灵草圃中获取到的四阶聚灵草，每100株可合成1株五阶聚灵草。',
        level: 4,
    },
    2037: {
        name: '五阶聚灵草',
        tips: '从聚灵草圃中获取到的五阶聚灵草，每100株可合成1株六阶聚灵草。',
        level: 5,
    },
    2038: {
        name: '六阶聚灵草',
        tips: '从聚灵草圃中获取到的六阶聚灵草，每100株可合成1株七阶聚灵草。',
        level: 6,
    },
    2039: {
        name: '七阶聚灵草',
        tips: '从聚灵草圃中获取到的七阶聚灵草，蕴含纯粹的灵魂道蕴。',
        level: 7,
    },
    2040: {
        name: '浑浊不死泉',
        tips: '从不死泉流中获取到的浑浊不死泉，每100道可合成1道一阶不死泉。',
        level: 1,
    },
    2041: {
        name: '一阶不死泉',
        tips: '从不死泉流中获取到的一阶不死泉，每100道可合成1道二阶不死泉。',
        level: 1,
    },
    2042: {
        name: '二阶不死泉',
        tips: '从不死泉流中获取到的二阶不死泉，每100道可合成1道三阶不死泉。',
        level: 2,
    },
    2043: {
        name: '三阶不死泉',
        tips: '从不死泉流中获取到的三阶不死泉，每100道可合成1道四阶不死泉。',
        level: 3,
    },
    2044: {
        name: '四阶不死泉',
        tips: '从不死泉流中获取到的四阶不死泉，每100道可合成1道五阶不死泉。',
        level: 4,
    },
    2045: {
        name: '五阶不死泉',
        tips: '从不死泉流中获取到的五阶不死泉，每100道可合成1道六阶不死泉。',
        level: 5,
    },
    2046: {
        name: '六阶不死泉',
        tips: '从不死泉流中获取到的六阶不死泉，每100道可合成1道七阶不死泉。',
        level: 6,
    },
    2047: {
        name: '七阶不死泉',
        tips: '从不死泉流中获取到的七阶不死泉，蕴含纯粹的不死道蕴。',
        level: 7,
    },
    2048: {
        name: '浑浊无根水',
        tips: '从无根水池中获取到的浑浊无根水，每100道可合成1道一阶无根水。',
        level: 1,
    },
    2049: {
        name: '一阶无根水',
        tips: '从无根水池中获取到的一阶无根水，每100道可合成1道二阶无根水。',
        level: 1,
    },
    2050: {
        name: '二阶无根水',
        tips: '从无根水池中获取到的二阶无根水，每100道可合成1道三阶无根水。',
        level: 2,
    },
    2051: {
        name: '三阶无根水',
        tips: '从无根水池中获取到的三阶无根水，每100道可合成1道四阶无根水。',
        level: 3,
    },
    2052: {
        name: '四阶无根水',
        tips: '从无根水池中获取到的四阶无根水，每100道可合成1道五阶无根水。',
        level: 4,
    },
    2053: {
        name: '五阶无根水',
        tips: '从无根水池中获取到的五阶无根水，每100道可合成1道六阶无根水。',
        level: 5,
    },
    2054: {
        name: '六阶无根水',
        tips: '从无根水池中获取到的六阶无根水，每100道可合成1道七阶无根水。',
        level: 6,
    },
    2055: {
        name: '七阶无根水',
        tips: '从无根水流中获取到的七阶无根水，蕴含纯粹的净化道蕴。',
        level: 7,
    },
    2056: {
        name: '先天水灵石',
        tips: '天地诞生之时，一缕水系法则落入灵石矿脉中经过数万年凝聚而出。',
    },
    2057: {
        name: '先天火灵石',
        tips: '天地诞生之时，一缕火系法则落入灵石矿脉中经过数万年凝聚而出。',
    },
    2058: {
        name: '先天风灵石',
        tips: '天地诞生之时，一缕风系法则落入灵石矿脉中经过数万年凝聚而出。',
    },
    2059: {
        name: '先天雷灵石',
        tips: '天地诞生之时，一缕雷系法则落入灵石矿脉中经过数万年凝聚而出。',
    },
    2060: {
        name: '先天冰灵石',
        tips: '天地诞生之时，一缕冰系法则落入灵石矿脉中经过数万年凝聚而出。',
    },
    2061: {
        name: '秘银矿石',
        tips: '从秘银石矿中获取到的稀有矿石，价值不菲。',
    },
    2062: {
        name: '紫金矿石',
        tips: '从紫金石矿中获取到的稀有矿石，价值不菲。',
    },
}

module.exports = {
    getArticleList: function () {
        return Object.keys(articleMap).map((id) => {
            const idNum = Number(id);
            return {
                ...articleMap[id],
                id: idNum,
            }
        })
    },
    getArticle: function (id) {
        if (!articleMap[id]) {
            console.log('未找到物品：', id);
            return;
        }
        return JSON.parse(JSON.stringify({
            ...articleMap[id],
            id,
        }))
    }

}