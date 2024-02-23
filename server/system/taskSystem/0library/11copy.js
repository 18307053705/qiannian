const { TASK_TYPE } = require('./enum');
module.exports = {
    110: {
        title: '炼魂洞',
        tips: '数百年前的邪修炼魂郎君正在谋划复活，赶紧去阻止他吧。',
        level: 28,
        reward: {
            fun: 'LianHunDong',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足28级，无法领取炼魂洞副本。',
        grand: {
            npc: {
                id: 424,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20511,
                    address: '50000,0,0',
                },
                {
                    id: 20512,
                    address: '50000,0,1',
                },
                {
                    id: 20513,
                    address: '50000,0,2',
                },
                {
                    id: 20514,
                    address: '50000,0,3',
                },
                {
                    id: 20515,
                    address: '50000,0,4',
                },
                {
                    id: 20516,
                    address: '50000,0,5',
                },
                {
                    id: 20517,
                    address: '50000,0,6',
                },
                {
                    id: 20518,
                    address: '50000,0,7',
                },
            ],
        },
        receive: [
            "炼魂洞府，森冷冰凉。",
            "炼魂郎君布下炼魂大阵，分化出无数道残魂阻止你。",
            "&接受任务",
        ],
        done: [
            "炼魂郎君被你镇压，整个洞府开始晃动起来。",
            "眼见炼魂洞府就要坍塌，你连忙离开。",
            "&完成任务",
        ]
    },
    111: {
        title: '黑炎宗',
        tips: "传承千年的黑炎宗竟然在血祭数万凡人，复活传说中的血魔。",
        level: 40,
        reward: {
            fun: 'HeiYanZong',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足40级，无法领取黑炎宗副本。',
        grand: {
            npc: {
                id: 425,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20521,
                    address: '50001,0,0',
                },
                {
                    id: 20522,
                    address: '50001,0,1',
                },
                {
                    id: 20523,
                    address: '50001,0,2',
                },
                {
                    id: 20524,
                    address: '50001,1,1',
                },
                {
                    id: 20525,
                    address: '50001,2,0',
                },
                {
                    id: 20526,
                    address: '50001,2,1',
                },
                {
                    id: 20527,
                    address: '50001,2,2',
                },
                {
                    id: 20528,
                    address: '50001,3,1',
                },
            ],
        },
        receive: [
            "黑炎宗，漆黑冰冷的宫殿中充满血腥味。",
            "无数的长老与弟子正护卫在一个诡异的祭台四周。",
            "此时传承千年的黑炎宗竟然在血祭数万凡人，复活传说中的血魔。",
            "&接受任务",
        ],
        done: [
            "一场大战之后，整个黑炎宗从弟子，护法，长老，宗主尽数陨落。",
            "此时的大殿已经是一片狼藉。",
            "&完成任务",
        ]
    },
    112: {
        title: '四海龙宫',
        tips: '传说中唯有大气运者才能见到传说中的龙宫。',
        level: 50,
        reward: {
            fun: 'SiHaiLongGong',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足50级，无法领取四海龙宫副本。',
        grand: {
            npc: {
                id: 426,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20531,
                    address: '50002,0,0',
                },
                {
                    id: 20532,
                    address: '50002,0,1',
                },
                {
                    id: 20533,
                    address: '50002,0,2',
                },
                {
                    id: 20534,
                    address: '50002,1,1',
                },
                {
                    id: 20535,
                    address: '50002,2,0',
                },
                {
                    id: 20536,
                    address: '50002,2,1',
                },
                {
                    id: 20537,
                    address: '50002,2,2',
                },
                {
                    id: 20538,
                    address: '50002,3,1',
                },
            ],
        },
        receive: [
            "在南海之岸有这样一个传说。",
            "在太阳升起之时，有缘者可在天地相接之处见到传说中的龙宫入口，龙宫内拥有无数稀世的天材地宝。",
            "这日你来到南海之岸，一道金色霞光落洒落在海面，隐隐中竟然还有一座金碧辉煌的宫殿。",
            "&进入龙宫",
        ],
        done: [
            "龙宫之内，金碧辉煌。",
            "无数海族强者守护在宫殿之中，你甚至还见到了传说中的龙族皇者。",
            "&完成任务",
        ]
    },
    // 113: {
    //     title: '凤凰桐木',
    //     tips: '一座荒凉的大山，山巅之上隐隐传来恐怖的大妖气息。',
    //     level: 60,
    //     reward: {
    //         fun: 'FengHuangTongMu',
    //     },
    //     type: TASK_TYPE.zhandou,
    //     levelText: '等级不足60级，无法领取凤凰桐木副本。',
    //     grand: {
    //         npc: {
    //             id: 427,
    //             address: '40001,1,0',
    //         },
    //         freak: [
    //             {
    //                 id: 20541,
    //                 address: '50003,0,0',
    //             },
    //             {
    //                 id: 20542,
    //                 address: '50003,0,1',
    //             },
    //             {
    //                 id: 20543,
    //                 address: '50003,0,2',
    //             },
    //             {
    //                 id: 20544,
    //                 address: '50003,1,1',
    //             },
    //             {
    //                 id: 20545,
    //                 address: '50003,2,0',
    //             },
    //             {
    //                 id: 20546,
    //                 address: '50003,2,1',
    //             },
    //             {
    //                 id: 20547,
    //                 address: '50003,2,2',
    //             },
    //             {
    //                 id: 20548,
    //                 address: '50003,3,1',
    //             },
    //         ],
    //     },
    //     receive: [
    //         '你站在荒凉的山脚，便感觉到山巅传来的大妖威压。',
    //         '抬头看去，只见山巅之上一棵千年梧桐古树，万丈大树直入云端，枝干四面延伸，遮天蔽日。',
    //         "一座有些破旧的诡异道观，安静的坐落在山脚。",
    //         "&进入道观",
    //     ],
    //     done: [
    //         "凤凰桐木。",
    //         "&完成任务",
    //     ]
    // },
    114: {
        title: '魔尊传说',
        tips: '魔尊传说',
        level: 70,
        reward: {
            fun: 'MoZunChuanShuo',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足70级，无法领取魔尊传说副本。',
        grand: {
            npc: {
                id: 428,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20551,
                    address: '50004,0,0',
                },
                {
                    id: 20552,
                    address: '50004,0,1',
                },
                {
                    id: 20553,
                    address: '50004,0,2',
                },
                {
                    id: 20554,
                    address: '50004,1,1',
                },
                {
                    id: 20555,
                    address: '50004,2,0',
                },
                {
                    id: 20556,
                    address: '50004,2,1',
                },
                {
                    id: 20557,
                    address: '50004,2,2',
                },
                {
                    id: 20558,
                    address: '50004,3,1',
                },
            ],
        },
        receive: [
            "魔尊传说。",
            "魔尊传说。",
            "&【接受任务】",
        ],
        done: [
            "魔尊传说。",
            "&完成任务",
        ]
    },
    115: {
        title: '海底魔宫',
        tips: '海底魔宫',
        level: 80,
        reward: {
            fun: 'HaiDiMoGong',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足80级，无法领取海底魔宫副本。',
        grand: {
            npc: {
                id: 429,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20561,
                    address: '50005,0,0',
                },
                {
                    id: 20562,
                    address: '50005,0,1',
                },
                {
                    id: 20563,
                    address: '50005,0,2',
                },
                {
                    id: 20564,
                    address: '50005,1,1',
                },
                {
                    id: 20565,
                    address: '50005,2,0',
                },
                {
                    id: 20566,
                    address: '50005,2,1',
                },
                {
                    id: 20567,
                    address: '50005,2,2',
                },
                {
                    id: 20568,
                    address: '50005,3,1',
                },
            ],
        },
        receive: [
            "海底魔宫。",
            "海底魔宫。",
            "&【接受任务】",
        ],
        done: [
            "海底魔宫。",
            "&完成任务",
        ]
    },
    116: {
        title: '魔族遗迹',
        tips: '魔族遗迹',
        level: 90,
        reward: {
            fun: 'MoZuYiJi',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足90级，无法领取魔族遗迹副本。',
        grand: {
            npc: {
                id: 430,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20571,
                    address: '50006,0,0',
                },
                {
                    id: 20572,
                    address: '50006,0,1',
                },
                {
                    id: 20573,
                    address: '50006,0,2',
                },
                {
                    id: 20574,
                    address: '50006,1,1',
                },
                {
                    id: 20575,
                    address: '50006,2,0',
                },
                {
                    id: 20576,
                    address: '50006,2,1',
                },
                {
                    id: 20577,
                    address: '50006,2,2',
                },
                {
                    id: 20578,
                    address: '50006,3,1',
                },
            ],
        },
        receive: [
            "魔族遗迹。",
            "魔族遗迹。",
            "&【接受任务】",
        ],
        done: [
            "魔族遗迹。",
            "&完成任务",
        ]
    },
    116: {
        title: '幽冥地府',
        tips: '幽冥地府',
        level: 100,
        reward: {
            fun: 'YouMingDiFu',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足100级，无法领取幽冥地府副本。',
        grand: {
            npc: {
                id: 431,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20581,
                    address: '50007,0,0',
                },
                {
                    id: 20582,
                    address: '50007,0,1',
                },
                {
                    id: 20583,
                    address: '50007,0,2',
                },
                {
                    id: 20584,
                    address: '50007,1,1',
                },
                {
                    id: 20585,
                    address: '50007,2,0',
                },
                {
                    id: 20586,
                    address: '50007,2,1',
                },
                {
                    id: 20587,
                    address: '50007,2,2',
                },
                {
                    id: 20588,
                    address: '50007,3,1',
                },
            ],
        },
        receive: [
            "幽冥地府。",
            "幽冥地府。",
            "&【接受任务】",
        ],
        done: [
            "幽冥地府。",
            "&完成任务",
        ]
    },
    117: {
        title: '群魔乱舞',
        tips: '群魔乱舞',
        level: 100,
        reward: {
            fun: 'QunMoLuanWu',
        },
        type: TASK_TYPE.zhandou,
        levelText: '等级不足100级，无法领取群魔乱舞副本。',
        grand: {
            npc: {
                id: 432,
                address: '40001,1,0',
            },
            freak: [
                {
                    id: 20591,
                    address: '50008,0,0',
                },
                {
                    id: 20592,
                    address: '50008,0,1',
                },
                {
                    id: 20593,
                    address: '50008,0,2',
                },
                {
                    id: 20594,
                    address: '50008,1,1',
                },
                {
                    id: 20595,
                    address: '50008,2,0',
                },
                {
                    id: 20596,
                    address: '50008,2,1',
                },
                {
                    id: 20597,
                    address: '50008,2,2',
                },
                {
                    id: 20598,
                    address: '50008,3,1',
                },
            ],
        },
        receive: [
            "群魔乱舞。",
            "群魔乱舞。",
            "&【接受任务】",
        ],
        done: [
            "群魔乱舞。",
            "&完成任务",
        ]
    },
}
