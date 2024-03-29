// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]
// 地图元素(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
// 仙族地图 id3开头
const immortalGrand = {
    30000: {
        id: 30000,
        name: "蓬莱仙岛",
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
    30001: {
        id: 30001,
        name: "九仙山",
        data: [
            [
                {
                    list: [
                        [43],
                        [44],
                        [40]
                    ],
                    tip: "仙族主城,强者随处可见。"
                },
                {
                    list: [
                        [45],
                        [46],
                        [47],
                        [48],
                        [49],
                        [410, 411, 412, 413],
                        [414, 415, 416],
                        [13]
                    ],
                    n: '交易区',
                    tip: "繁华的交易场所,互通三界,传说中的拍卖行更是拍出过天价之宝。"
                },
                {
                    list: [
                        [417],
                        [418],
                        [419],
                        [420],
                        [421],
                    ],
                    n: '生活区',
                    tip: "仙族修士的生活区域,你可以在这里寻找自己的势力。"
                },
                {
                    list: [
                        [422],
                        [423]
                    ],
                    n: '异界裂缝',
                    tip: "在这里有无数裂缝可通往异世界，同时也会有异界生物入侵,所幸有历代仙族先辈守护。"
                },

            ]
        ]
    },
    30002: {
        id: 30002,
        name: "九天虚无岛",
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
    30003: {
        id: 30003,
        name: "九重天",
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
    30004: {
        id: 30004,
        name: "云顶天宫",
        data: [
            [
                {
                    list: [
                        [12]
                    ],  
                }
            ]
        ]
    }
};

module.exports = {
    immortalGrand,
};