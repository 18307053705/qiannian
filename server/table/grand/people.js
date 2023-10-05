// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]  元素:{list,n,tip }
// 地图元素(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
// 人族地图 id1开头
const peopleGrand = {
    10000: {
        id: 10000,
        name: "隐仙村",
        data: [
            [
                {
                    n: '隐仙村',
                    tip: "极为偏僻的村庄,村口有一棵传说从上古时期便存在的参天古树。"
                },
                {
                    list: [[20, 21, 22]],
                    n: '十里坡',
                    tip: "到处都是极其危险山贼。"
                },
                {
                    list: [[23, 24, 25, 26, 27]],
                    n: '装备材料',
                    tip: "到处都是极其危险山贼。"
                },
                {
                    list: [[28, 29, 210, 211], [212, 213]],
                    n: '声望',
                    tip: "到处都是极其危险山贼。"
                },
            ]
        ]
    },
    10001: {
        id: 10001,
        name: "剑舞城",
        data: [
            [
                {
                    list: [
                        [43],
                        [440],
                        [40]
                    ],
                    tip: "人族主城,强者随处可见。"
                },
                {
                    list: [
                        [45],
                        [46],
                        [47],
                        [48],
                        [49],
                        [410, 411, 413, 414],
                        [415]
                    ],
                    n: '交易区',
                    tip: "繁华的交易场所,互通三界,传说中的拍卖行更是拍出过天价之宝。"
                },
                {
                    list: [
                        [417],
                        [418],
                        [419],
                        [38],
                        [421],
                    ],
                    n: '生活区',
                    tip: "人族修士的生活区域,你可以在这里寻找自己的势力。"
                },
                {
                    list: [
                        [422],
                        [423]
                    ],
                    n: '异界裂缝',
                    tip: "在这里有无数裂缝可通往异世界，同时也会有异界生物入侵,所幸有历代人族先辈守护。"
                },

            ]
        ]
    },
    10002: {
        id: 10002,
        name: "大泽谷",
        data: [
            [
                {
                    list: [
                        // [16]
                    ],
                    n: '大泽入口',
                    tip: "在这里有无数裂缝可通往异世界，同时也会有异界生物入侵,所幸有历代人族先辈守护。"
                },
                {
                    list: [
                        [16]
                    ],
                    n: '欧冶子居所',
                    tip: "在这里隐居着以为传奇神匠。"
                }
            ]
        ]
    },
    10003: {
        id: 10003,
        name: "映月崖",
        data: [
            [
                {
                    list: [
                        [12]
                    ],
                }
            ]
        ]
    },
    10004: {
        id: 10004,
        name: "五帝冢",
        data: [
            [
                {
                    list: [
                        [12]
                    ],
                }
            ]
        ]
    },
};

module.exports = {
    peopleGrand,
};