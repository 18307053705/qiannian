// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]  元素:{list,n,tip }
// 地图元素(1开头:NPC元素,2开头:怪物元素,3开头:传送元素,4:面板元素)
// 异界地图 id6开头
const differenceGrand = {
    60000: {
        id: 60000,
        name: "情缘之地",
        data: [
            [
                {
                    list: [[434]],
                    n: '姻缘石',
                    tip: "传说中的姻缘石，可让两情相悦者缔结姻缘。"
                },
                {
                    n: '姻缘树',
                    tip: "姻缘树，天地造化而成，传说唯有缔结姻缘之人可以看到。"
                }
            ]
        ]
    },
    60001: {
        id: 60001,
        name: "落叶谷",
        data: [
            [
                {
                    list: [[436]],
                    n: '情劫之地',
                    tip: "由无尽因果所化之地，传说有情人在机缘巧合之下会进入此地，共同历劫。"
                },
                {
                    n: '无尽花海',
                    tip: "此处开满了鲜花，扑面而来的香气令人忍不住的想要入睡，似乎蕴藏着一丝杀机。"
                },
                {
                    n: '枫叶湖',
                    tip: "漫天的飞雪与一座平静的湖面，在湖面的四周长着无数枫树，偶尔一缕寒风轻抚将几片红叶带入湖中。"
                },
                {
                    n: '林中小屋',
                    tip: "你发现这茂密的竹林中竟然有一所竹屋，看着似乎以前有人居住过。"
                },
                {
                    n: '藤龙谷',
                    tip: "一棵古老的大树直入云端，枝叶遮天蔽日，一条条如同神龙般的巨大藤蔓盘旋在树身之上。"
                },
                {
                    n: '凌月崖',
                    tip: "一处极高悬空的山崖，巨大的圆月仿佛就在你脚下，似乎还能看到上面由寒冰浇筑的宫殿。"
                },
                {
                    list: [[437]],
                    n: '落叶谷',
                    tip: "一处看着比较偏僻的山谷，谷中一切安静，仿佛独立于天地之外。"
                },
            ]
        ]
    },
    60002: {
        id: 60002,
        name: "修炼房",
        data: [
            [
                { list: [[438]] },
                {},
                {},
                {},
                {},
                {},
                { list: [[439]] },
            ]
        ]
    },
    60003: {
        id: 60003,
        name: "上古战场",
        data: [
            [
                {
                    n: '上古战场一层',
                    tip: '上古时代流传下来的战场，曾经也是一方充满生机的世界，如今却只剩四处可见的废墟。'
                },
                {
                    n: '上古战场二层',
                    tip: '上古时代流传下来的战场，曾经也是一方充满生机的世界，如今却只剩四处可见的废墟。'
                },
            ]
        ]
    },
    60004: {
        id: 60004,
        name: "彩灵洞",
        data: [
            [
                {
                    n: '彩灵洞一层',
                    tip: '一处神奇的洞府，运气好可以在此处遇到传说中的精灵。'
                },
                {
                    n: '彩灵洞二层',
                    tip: '一处神奇的洞府，运气好可以在此处遇到传说中的精灵。'
                },
                {
                    n: '彩灵洞三层',
                    tip: '一处神奇的洞府，运气好可以在此处遇到传说中的精灵。'
                },
            ]
        ]
    },
    60005: {
        id: 60005,
        name: "金银岛",
        data: [
            [
                {
                    n: '金银岛外',
                    tip: '传说四处是宝藏的海上岛屿，海上时不时会漂来宝箱。'
                },
                {
                    n: '金银岛外',
                    tip: '传说四处是宝藏的海上岛屿，海上时不时会漂来宝箱。'
                },
                {
                    n: '金银岛外',
                    tip: '传说四处是宝藏的海上岛屿，海上时不时会漂来宝箱。'
                },
            ]
        ]
    },
};

module.exports = {
    differenceGrand,
};