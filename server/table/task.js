
const Equip = require('./equip');
const knapsack = require('./knapsack');
const { ELEMENT_5, ELEMENT_1 } = require('./element');


module.exports = {
    main: {
        1: {
            id: 1,
            title: '斩杀魔尊分身',
            tips: '前往魔界最深处斩杀魔尊分身(剑舞城2,1),然后回到找天机老人剑舞城(1,1)',
            reward: {
                article: [Equip[1], { ...knapsack[1], num: 5 }],
                exploit: 5000,
                world: 5000,
                exp: 100000,
                tael: 100000,
            },
            grand: {
                '100001,0,0': {
                    npc: [ELEMENT_1[1000001]]
                },
                '100001,1,0': {
                    freak: [ELEMENT_5[5000010]]
                }
            },
            complete: {
                fight: [{ id: ELEMENT_5[5000010]['id'], name: ELEMENT_5[5000010]['name'], num: 1 }],
            },
            nextTask: 2
        },
        2: {
            id: 2,
            title: '斩杀魔尊',
            tips: '前往魔界最深处斩杀魔尊重楼(剑舞城2,1),然后回到找天机老人剑舞城(1,1)',
            reward: {
                article: [Equip[1], { ...knapsack[1], num: 5 }],
                exp: 100000,
                tael: 100000,
                exploit: 5000,
                world: 5000,
            },
            grand: {
                '100001,0,0': {
                    npc: [ELEMENT_1[1000001]]
                },
                '100001,1,0': {
                    freak: [ELEMENT_5[5000011]]
                }

            },
            complete: {
                fight: [{ id: ELEMENT_5[5000011]['id'], name: ELEMENT_5[5000011]['name'], num: 1 }],
                article: [{ id: knapsack[1]['id'], p: knapsack[1]['type'], num: 1 }]
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
                fight: [{ id: ELEMENT_5[5000000]['id'], name: ELEMENT_5[5000000]['name'], num: 5 }],
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
                fight: [{ id: ELEMENT_5[5000001]['id'], name: ELEMENT_5[5000001]['name'], num: 3 }],
            }
        },
    }

}