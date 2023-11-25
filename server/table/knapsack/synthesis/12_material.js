const { getArticle } = require('../article/20_dongTian');
const pellet = {
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
    // 1210: {
    //     id: 1810,
    //     material: '201-50,209-50,2017-50',
    //     tael: 10000,
    // },
    // 1211: {
    //     id: 1811,
    //     material: '201-140,209-140,2017-140',
    //     tael: 10000,
    // },
    // 1212: {
    //     id: 1812,
    //     material: '201-400,209-400,2017-400',
    //     tael: 10000,
    // },
    
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
