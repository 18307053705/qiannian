
const Equip = require('./equip');
const knapsack = require('./knapsack1');
const { getElement } = require('./element');
// 全部奖励实例
// article: [Equip[1], { ...knapsack[1], num: 5 }],
// exp: 100000,
// tael: 100000,
// exploit: 5000,
// world: 5000,

module.exports = {
    main: {
        1: {
            id: 1,
            title: '序章',
            tips: '我忘却了修为，只为千年前....',
            reward: {
                exp: 200,
                tael: 1000,
            },
            grand: {
                npc: {
                    ...getElement(1000000),
                    address: '10000,0,0',
                },
                targetNpc: {
                    ...getElement(1000000),
                    address: '10000,0,0',
                },
            },
            nextTask: 2,
        },
        2: {
            id: 2,
            title: '斩杀魔尊',
            tips: '前往魔界最深处斩杀魔尊重楼(剑舞城2,1),然后回到找白胡子老人剑舞城(2,1)',
            reward: {
                article: [Equip[97]],
                exp: 100000,
            },
            grand: {
                npc: {
                    ...getElement(1000001),
                    address: '10000,0,0',
                },
                freak: [{
                    ...getElement(2000001),
                    address: '10000,0,0',
                }]
            },
            complete: {
                fight: [{ ...getElement(2000001), num: 1 }],
                article: [{ id: knapsack[1]['id'], p: knapsack[1]['type'], num: 1 }]
            },
            nextTask: 3
        },
        3: {
            id: 3,
            title: '追杀魔尊',
            tips: '魔尊败逃，赶紧追过去吧,魔尊重楼(剑舞城2,1),然后回到找天机老人剑舞城(1,1)',
            reward: {
                article: [Equip[1], { ...knapsack[1], num: 5 }],
                exp: 100000,
                tael: 100000,
                exploit: 5000,
                world: 5000,
            },
            grand: {
                npc: {
                    ...getElement(1000002),
                    address: '10000,0,0',
                },
                targetNpc: [
                    {
                        ...getElement(1000001),
                        address: '10000,0,0',
                    }
                ],
            },
            nextTask: -1
        },
    },
    daily: {
        1: {
            id: 1,
            title: '聒噪的紫草冰精',
            tips: '前往南海琉璃宫，击杀5只紫草冰精',
            pos: {
                text: '南海琉璃宫(1,2)',
                value: '10000,0,1'
            },
            complete: {
                fight: [{ ...getElement(2000000), num: 5 }],
            }
        },
        2: {
            id: 2,
            title: '聒噪的虾兵蟹将',
            tips: '前往南海琉璃宫，击杀3只虾兵蟹将',
            pos: {
                text: '南海琉璃宫(1,2)',
                value: '10000,0,1'
            },
            reward: {
                exp: 100000,
                tael: 100000,
            },
            complete: {
                fight: [{ ...getElement(2000001), num: 3 }],
            }
        },
    },
}