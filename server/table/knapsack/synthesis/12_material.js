const { getArticle } = require('../article');
const materialMap = {
    120: {
        id: 120,
        material: '2056-10,2057-10,2058-10,2059-10,2060-10',
        tael: 10000,
    },
    121: {
        id: 121,
        material: '2056-10,2057-10,2058-10,2059-10,2060-10',
        tael: 10000,
    },
    122: {
        id: 122,
        material: '2056-10,2057-10,2058-10,2059-10,2060-10',
        tael: 10000,
    },
    123: {
        id: 123,
        material: '2056-15,2057-15,2058-15,2059-15,2060-15',
        tael: 10000,
    },
    124: {
        id: 185,
        material: '2056-10',
        tael: 10000,
    },
    125: {
        id: 186,
        material: '2057-10',
        tael: 10000,
    },
    126: {
        id: 187,
        material: '2058-10',
        tael: 10000,
    },
    127: {
        id: 188,
        material: '2059-10',
        tael: 10000,
    },
    128: {
        id: 189,
        material: '2060-10',
        tael: 10000,
    },
    129: {
        id: 184,
        material: '2056-10,2057-10,2058-10,2059-10,2060-10',
        tael: 10000,
    },
    1210: {
        id: 1634,
        material: '2061-1',
        tael: 10000,
    },
    1211: {
        id: 1635,
        material: '2061-4',
        tael: 10000,
    },
    1212: {
        id: 1636,
        material: '2061-7',
        tael: 10000,
    },
    1213: {
        id: 1624,
        material: '2062-3',
        tael: 10000,
    },
    1214: {
        id: 1626,
        material: '2062-5',
        tael: 10000,
    },
    1215: {
        id: 1627,
        material: '2062-8',
        tael: 10000,
    },
}


module.exports = {
    getAllMaterialMap: function () {
        return Object.keys(materialMap).map(uid => {
            const { id, ...item } = materialMap[uid];
            return JSON.parse(JSON.stringify({
                uid,
                id,
                ...item,
                article: getArticle(id)
            }))
        })
    },
    getMaterial: function (uid) {
        if (!materialMap[uid]) {
            console.log('合成物品异常::', uid)
            return;
        }
        const { id, ...item } = materialMap[uid];
        return JSON.parse(JSON.stringify({
            uid,
            id,
            ...item,
            article: getArticle(id)
        }))
    },
}
