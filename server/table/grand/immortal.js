// 仙族地图 id3开头
const immortalGrand = {
    30000: {
        id: 30000,
        name: "蓬莱仙岛",
        data: [
            [
                {
                    n: '蓬莱岛',
                    tip: "极为偏僻的村庄,村口有一棵传说从上古时期便存在的参天古树。",
                    list: [[44]],
                },
                {
                    list: [[20111, 20112]],
                    n: '十里坡',
                    tip: "到处都是极其危险山贼。"
                },
                {
                    list: [[20113, 20114]],
                    n: '十里坡',
                    tip: "到处都是极其危险山贼。"
                },
                {
                    list: [[20115, 20116]],
                    n: '黑风寨',
                    tip: "到处都是极其危险山贼。"
                },
                {
                    list: [[20117, 20118]],
                    n: '后山悬崖',
                    tip: "到处都是极其危险山贼。"
                },
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
                        [440],
                        [417],
                        [416],
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
                        [418],
                        [419],
                        [420],
                        [38],
                        // [421],
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
    30002: {
        id: 30002,
        name: "九天虚无岛",
        data: [
            [
                { list: [[20121, 20122]]},
                { list: [[20123, 20124]]},
                { list: [[20125, 20126]]},
                { list: [[20127, 20128]]},
            ],
            [
                {
                    list: [[441]],
                    n: '欧冶子居所',
                    tip: "看起来有些简陋的茅屋，传说中人族神匠欧冶子隐居之所，外面还立着一座火炉。"
                },
            ]
        ]
    },
    30003: {
        id: 30003,
        name: "堕仙涧",
        data: [
            [
                { list: [[20131, 20132]]},
                { list: [[20133, 20134]]},
                { list: [[20135, 20136]]},
                { list: [[20137, 20138]]},
            ],
        ]
    },
    30004: {
        id: 30004,
        name: "云顶天宫",
        data: [
            [
                { list: [[20141, 20142]]},
                { list: [[20143, 20144]]},
                { list: [[20145, 20146]]},
                { list: [[20147, 20148]]},
            ],
        ]
    },
};

module.exports = {
    immortalGrand,
};