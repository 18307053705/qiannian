// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]
// 地图元素(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
// 中立地图 id 4开头
const neutralityGrand = {
    40000: {
        id: 40000,
        name: "云荒大陆",
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
    40001: {
        id: 40001,
        name: "无妄海",
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
    40002: {
        id: 40002,
        name: "南海琉璃宫",
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
    40003: {
        id: 40003,
        name: "十万大山",
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
    40004: {
        id: 40004,
        name: "封神山",
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
    neutralityGrand,
};