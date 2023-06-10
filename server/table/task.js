
const Equip = require('./equip');
const knapsack = require('./knapsack');
const { ELEMENT_5 } = require('./element');
module.exports = {
    main: {
        1: {
            id: 1,
            group: [
                {
                    title: '斩杀魔尊',
                    tips: '前往魔界最深处斩杀魔尊重楼',
                    reward: [Equip[1], { ...knapsack[1], num: 5 }],
                    pos: {
                        text: '魔界(1,2)',
                        value: '10005,1,2'
                    },
                    complete: {
                        fight: [{ ...ELEMENT_5[5000000], num: 5 }]
                    }
                }
            ],
        },
        2: {
            id: 2,
            group: [
                {
                    title: '斩杀魔尊分',
                    tips: '前往魔界最深处斩杀魔尊重楼',
                    reward: [Equip[1], { ...knapsack[1], num: 5 }],
                    pos: {
                        text: '魔界(1,2)',
                        value: '10005,1,2'
                    },
                }
            ],
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
                fight: [{ ...ELEMENT_5[5000000], num: 5 }],
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
            complete: {
                fight: [{ ...ELEMENT_5[5000001], num: 3 }],
            }
        },
    }

}