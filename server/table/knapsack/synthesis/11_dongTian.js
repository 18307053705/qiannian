

const { getArticle } = require('../article');
const dongTian = {
    110: {
        id: 201,
        material: '200-100',
        tael: 100,
    },
    111: {
        id: 202,
        material: '201-100',
        tael: 500,
    },
    112: {
        id: 203,
        material: '202-100',
        tael: 1000,
    },
    113: {
        id: 204,
        material: '203-100',
        tael: 2000,
    },
    114: {
        id: 205,
        material: '204-100',
        tael: 3000,
    },
    115: {
        id: 206,
        material: '205-100',
        tael: 5000,
    },
    116: {
        id: 207,
        material: '206-100',
        tael: 10000,
    },

    117: {
        id: 209,
        material: '208-100',
        tael: 100,
    },
    118: {
        id: 2010,
        material: '209-100',
        tael: 500,
    },
    119: {
        id: 2011,
        material: '2010-100',
        tael: 1000,
    },
    1110: {
        id: 2012,
        material: '2011-100',
        tael: 2000,
    },
    1111: {
        id: 2013,
        material: '2012-100',
        tael: 3000,
    },
    1112: {
        id: 2014,
        material: '2013-100',
        tael: 5000,
    },
    1113: {
        id: 2015,
        material: '2014-100',
        tael: 10000,
    },
    1114: {
        id: 2017,
        material: '2016-100',
        tael: 100,
    },
    1115: {
        id: 2018,
        material: '2017-100',
        tael: 500,
    },
    1116: {
        id: 2019,
        material: '2018-100',
        tael: 1000,
    },
    1117: {
        id: 2020,
        material: '2019-100',
        tael: 2000,
    },
    1118: {
        id: 2021,
        material: '2020-100',
        tael: 3000,
    },
    1119: {
        id: 2022,
        material: '2021-100',
        tael: 5000,
    },
    1120: {
        id: 2023,
        material: '2022-100',
        tael: 10000,
    },
    1121: {
        id: 2025,
        material: '2024-100',
        tael: 100,
    },
    1122: {
        id: 2026,
        material: '2025-100',
        tael: 500,
    },
    1123: {
        id: 2027,
        material: '2026-100',
        tael: 1000,
    },
    1124: {
        id: 2028,
        material: '2027-100',
        tael: 2000,
    },
    1125: {
        id: 2029,
        material: '2028-100',
        tael: 3000,
    },
    1126: {
        id: 2030,
        material: '2029-100',
        tael: 5000,
    },
    1127: {
        id: 2031,
        material: '2030-100',
        tael: 10000,
    },
    1128: {
        id: 2033,
        material: '2032-100',
        tael: 100,
    },
    1129: {
        id: 2034,
        material: '2033-100',
        tael: 500,
    },
    1130: {
        id: 2035,
        material: '2034-100',
        tael: 1000,
    },
    1131: {
        id: 2036,
        material: '2035-100',
        tael: 2000,
    },
    1132: {
        id: 2037,
        material: '2036-100',
        tael: 3000,
    },
    1133: {
        id: 2038,
        material: '2037-100',
        tael: 5000,
    },
    1134: {
        id: 2039,
        material: '2038-100',
        tael: 10000,
    },
    1135: {
        id: 2041,
        material: '2040-100',
        tael: 100,
    },
    1136: {
        id: 2042,
        material: '2041-100',
        tael: 500,
    },
    1137: {
        id: 2043,
        material: '2042-100',
        tael: 1000,
    },
    1138: {
        id: 2044,
        material: '2043-100',
        tael: 2000,
    },
    1139: {
        id: 2045,
        material: '2044-100',
        tael: 3000,
    },
    1140: {
        id: 2046,
        material: '2045-100',
        tael: 5000,
    },
    1141: {
        id: 2047,
        material: '2046-100',
        tael: 10000,
    },
    1142: {
        id: 2049,
        material: '2048-100',
        tael: 100,
    },
    1143: {
        id: 2050,
        material: '2049-100',
        tael: 500,
    },
    1144: {
        id: 2051,
        material: '2050-100',
        tael: 1000,
    },
    1145: {
        id: 2052,
        material: '2051-100',
        tael: 2000,
    },
    1146: {
        id: 2053,
        material: '2052-100',
        tael: 3000,
    },
    1147: {
        id: 2054,
        material: '2053-100',
        tael: 5000,
    },
    1148: {
        id: 2055,
        material: '2054-100',
        tael: 10000,
    },
}


module.exports = {
    getAllDongTian: function () {
        return Object.keys(dongTian).map(uid => {
            const { id, ...item } = dongTian[uid];
            return JSON.parse(JSON.stringify({
                uid,
                id,
                ...item,
                article: getArticle(id)
            }))
        })
    },
    getDongTian: function (uid) {
        if (!dongTian[uid]) {
            console.log('合成物品异常::', uid)
            return;
        }
        const { id, ...item } = dongTian[uid];
        return JSON.parse(JSON.stringify({
            uid,
            id,
            ...item,
            article: getArticle(id)
        }))
    },
}