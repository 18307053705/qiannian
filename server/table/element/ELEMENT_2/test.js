const gemstone = require('../../knapsack/article/17_gemstone');
const equipMaterial = require('../../knapsack/article/18_equipMaterial');
const reel = require('../../knapsack/article/12_reel');
const reply = require('../../knapsack/article/10_reply');
const buff = require('../../knapsack/article/11_buff');
const treasure = require('../../knapsack/article/19_treasure');
const material = require('../../knapsack/article/14_material');

const TEST = {
    2999988: {
        id: 2999988,
        name: "宝石",
        type: 2,
        level: 1,
        isRanks: true,
        // article: '230-20,235-20,240-20,245-20,250-20,255-20,260-20,265-20,270-20,275-20,280-20,285-20,290-20,295-20',
        article: gemstone.getArticleList().map(({ id }) => `${id}-20`).join(','),
       
    },
    2999989: {
        id: 2999989,
        name: "装备材料",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: equipMaterial.getArticleList().map(({ id }) => `${id}-200`).join(','),
    },
    2999990: {
        id: 2999990,
        name: "二阶装备boss",
        type: 2,

        level: 1,
        attr: 1,
        isRanks: true,
        article: reel.getArticleList().map(({ id }) => `${id}-9900`).join(','),
    },
    2999991: {
        id: 2999991,
        name: "药品",
        exp: 100, 
        level: 1,
        attr: 0.5,
        isRanks: true,
        creatNum:1,
        article: reply.getArticleList().map(({ id }) => `${id}-10`).join(','),
    },
    2999992: {
        id: 2999992,
        name: "四阶装备boss",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: buff.getArticleList().map(({ id }) => `${id}-9900`).join(','),
    },
    2999993: {
        id: 2999993,
        name: "神装boss",
        type: 2,

        level: 1,
        attr: 1,
        isRanks: true,
        article: '309-500,310-500',
    },
    2999994: {
        id: 2999994,
        name: "声望boss",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: '42-5000,43-5000,45-5000',
    },
    2999995: {
        id: 2999995,
        name: "强化材料boss",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: '90-5000,91-5000,92-5000,93-5000,94-5000,95-5000,96-5000,97-5000,98-5000,99-5000,100-5000,101-5000,102-5000,103-5000,104-5000,105-5000',
    },
    2999996: {
        id: 2999996,
        name: "强化石,月光石boss",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: '156-30000,157-5000',
    },
    2999997: {
        id: 2999997,
        name: "帮会材料",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: '53-100,54-100,55-100,56-100,57-100,58-100,59-100,60-100',
    },
    2999998: {
        id: 2999998,
        name: "家具材料",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: material.getArticleList().map(({ id }) => `${id}-2000`).join(','),
    },
    2999999: {
        id: 2999999,
        name: "聚宝盆材料",
        type: 2,
        level: 1,
        attr: 1,
        isRanks: true,
        article: treasure.getArticleList().map(({ id }) => `${id}-2000`).join(','),
    },
}


module.exports = {
    TEST_FREAK: TEST
}