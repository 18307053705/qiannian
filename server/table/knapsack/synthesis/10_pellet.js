const { getArticle } = require('../article/20_dongTian');
const pellet = {
    // 1-9品凝血散
    100: {
        id: 100,
        material: '2025,2041',
        tael: 100,
        min: 3,
        max: 5,
    },
    101: {
        id: 102,
        material: '2025-10,2041-10',
        tael: 1000,
        min: 3,
        max: 5,
    },
    102: {
        id: 104,
        material: '2026,2042',
        tael: 2000,
        min: 3,
        max: 5,
    },
    103: {
        id: 106,
        material: '2026-10,2042-10',
        tael: 5000,
        min: 3,
        max: 5,
    },
    104: {
        id: 108,
        material: '2027,2043',
        tael: 10000,
        min: 3,
        max: 5,
    },
    105: {
        id: 1010,
        material: '2028,2044',
        tael: 30000,
        min: 3,
        max: 5,
    },
    106: {
        id: 1012,
        material: '2029,2045',
        tael: 50000,
        min: 3,
        max: 5,
    },
    107: {
        id: 1014,
        material: '2030,2046',
        tael: 70000,
        min: 3,
        max: 5,
    },
    108: {
        id: 1016,
        material: '2031,2047',
        tael: 100000,
        min: 3,
        max: 5,
    },
    // 1-9品聚气散
    109: {
        id: 101,
        material: '2033,2049',
        tael: 100,
        min: 3,
        max: 5,
    },
    1010: {
        id: 103,
        material: '2033-10,2049-10',
        tael: 1000,
        min: 3,
        max: 5,
    },
    1011: {
        id: 105,
        material: '2034,2050',
        tael: 2000,
        min: 3,
        max: 5,
    },
    1012: {
        id: 107,
        material: '2034-10,2050-10',
        tael: 5000,
        min: 3,
        max: 5,
    },
    1013: {
        id: 109,
        material: '2035,2051',
        tael: 10000,
        min: 3,
        max: 5,
    },
    1014: {
        id: 1011,
        material: '2036,2052',
        tael: 30000,
        min: 3,
        max: 5,
    },
    1015: {
        id: 1013,
        material: '2037,2053',
        tael: 50000,
        min: 3,
        max: 5,
    },
    1016: {
        id: 1015,
        material: '2038,2054',
        tael: 70000,
        min: 3,
        max: 5,
    },
    1017: {
        id: 1017,
        material: '2039,2055',
        tael: 100000,
        min: 3,
        max: 5,
    },
    // 1-9品气血丹
    1018: {
        id: 110,
        material: '2025-5,2041-5,209-5',
        tael: 1000,
        min: 1,
        max: 3,
    },
    1019: {
        id: 114,
        material: '2025-100,2041-100,209-100',
        tael: 10000,
        min: 1,
        max: 3,
    },
    1020: {
        id: 118,
        material: '2026-5,2042-5,2010-5',
        tael: 20000,
        min: 1,
        max: 3,
    },
    1021: {
        id: 1112,
        material: '2026-100,2042-100,2010-5',
        tael: 50000,
        min: 1,
        max: 3,
    },
    1022: {
        id: 1116,
        material: '2027-10,2043-10,2011-10',
        tael: 100000,
        min: 1,
        max: 3,
    },
    1023: {
        id: 1120,
        material: '2028-10,2044-10,2012-10',
        tael: 300000,
        min: 1,
        max: 3,
    },
    1024: {
        id: 1124,
        material: '2029-20,2045-20,2013-20',
        tael: 500000,
        min: 1,
        max: 3,
    },
    1025: {
        id: 1128,
        material: '2030-30,2046-30,2014-30',
        tael: 700000,
        min: 1,
        max: 3,
    },
    1026: {
        id: 1132,
        material: '2031-50,2047-50,2015-50',
        tael: 1000000,
        min: 1,
        max: 3,
    },
    // 1-9品法力丹
    1027: {
        id: 111,
        material: '2033-5,2049-5,201-5',
        tael: 1000,
        min: 1,
        max: 3,
    },
    1028: {
        id: 115,
        material: '2033-50,2049-50,201-50',
        tael: 10000,
        min: 1,
        max: 3,
    },
    1029: {
        id: 119,
        material: '2034-5,2050-5,202-5',
        tael: 20000,
        min: 1,
        max: 3,
    },
    1030: {
        id: 1113,
        material: '2034-100,2050-100,202-100',
        tael: 50000,
        min: 1,
        max: 3,
    },
    1031: {
        id: 1117,
        material: '2035-10,2051-10,203-10',
        tael: 100000,
        min: 1,
        max: 3,
    },
    1032: {
        id: 1121,
        material: '2036-10,2052-10,204-10',
        tael: 300000,
        min: 1,
        max: 3,
    },
    1033: {
        id: 1125,
        material: '2037-20,2053-20,205-20',
        tael: 500000,
        min: 1,
        max: 3,
    },
    1034: {
        id: 1129,
        material: '2038-30,2054-30,206-30',
        tael: 700000,
        min: 1,
        max: 3,
    },
    1035: {
        id: 1133,
        material: '2039-50,2055-50,207-50',
        tael: 1000000,
        min: 1,
        max: 3,
    },
    // 1-9品攻击丹
    1036: {
        id: 112,
        material: '201-10,209-5,2017-5',
        tael: 1000,
        min: 1,
        max: 3,
    },
    1037: {
        id: 116,
        material: '201-100,209-50,2017-50',
        tael: 10000,
        min: 1,
        max: 3,
    },
    1038: {
        id: 1110,
        material: '202-10,2010-5,2018-5',
        tael: 20000,
        min: 1,
        max: 3,
    },
    1039: {
        id: 1114,
        material: '202-200,2010-50,2018-50',
        tael: 50000,
        min: 1,
        max: 3,
    },
    1040: {
        id: 1118,
        material: '203-30,2011-10,2019-10',
        tael: 100000,
        min: 1,
        max: 3,
    },
    1041: {
        id: 1122,
        material: '204-30,2012-10,2020-10',
        tael: 300000,
        min: 1,
        max: 3,
    },
    1042: {
        id: 1126,
        material: '205-30,2013-10,2021-10',
        tael: 500000,
        min: 1,
        max: 3,
    },
    1043: {
        id: 1130,
        material: '206-30,2014-10,2022-10',
        tael: 700000,
        min: 1,
        max: 3,
    },
    1044: {
        id: 1134,
        material: '207-30,2015-10,2023-10',
        tael: 1000000,
        min: 1,
        max: 3,
    },
    // 1-9品防御丹
    1045: {
        id: 113,
        material: '209-10,201-5,2017-5',
        tael: 1000,
        min: 1,
        max: 3,
    },
    1046: {
        id: 117,
        material: '209-100,201-50,2017-50',
        tael: 10000,
        min: 1,
        max: 3,
    },
    1047: {
        id: 1111,
        material: '2010-10,202-5,2018-5',
        tael: 20000,
        min: 1,
        max: 3,
    },
    1048: {
        id: 1115,
        material: '2010-200,202-50,2018-50',
        tael: 50000,
        min: 1,
        max: 3,
    },
    1049: {
        id: 1119,
        material: '2011-30,203-10,2019-10',
        tael: 100000,
        min: 1,
        max: 3,
    },
    1050: {
        id: 1123,
        material: '2012-30,204-10,2020-10',
        tael: 300000,
        min: 1,
        max: 3,
    },
    1051: {
        id: 1127,
        material: '2013-30,205-10,2021-10',
        tael: 500000,
        min: 1,
        max: 3,
    },
    1052: {
        id: 1131,
        material: '2014-30,206-10,2022-10',
        tael: 700000,
        min: 1,
        max: 3,
    },
    1053: {
        id: 1135,
        material: '2015-30,207-10,2023-10',
        tael: 1000000,
        min: 1,
        max: 3,
    },
}


module.exports = {
    getAllPellet: function () {
        return Object.keys(pellet).map(uid => {
            const { id, ...item } = pellet[uid];
            return JSON.parse(JSON.stringify({
                uid,
                id,
                ...item,
                article: getArticle(id)
            }))
        })
    },
    getPellet: function (uid) {
        if (!pellet[uid]) {
            console.log('合成物品异常::', uid)
            return;
        }
        const { id, ...item } = pellet[uid];
        return JSON.parse(JSON.stringify({
            uid,
            id,
            ...item,
            article: getArticle(id)
        }))
    },
}