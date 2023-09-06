

module.exports = {
    1: {
        id: 1,
        title: '炼魂洞',
        tips: '传说中炼魂郎君的洞府',
        type: 1,
        reward: {
            attr: 'exp-200',
        },
        grand: {
            npc: {
                id: 4000024,
                address: '10000,0,0',
            },
            tNpc: {
                id: 4000024,
                address: '10000,0,0',
            },
            freak: [
                {
                    id: 2000014,
                    address: '10000,0,0',
                },
                {
                    id: 2000015,
                    address: '10000,0,1',
                },
                {
                    id: 2000016,
                    address: '10000,0,2',
                },
                {
                    id: 2000017,
                    address: '10000,0,3',
                }
            ],
        },
        treat: {
            text: '快点击杀全部洞主吧',
            address: '10000,0,0',
            name: '隐仙村(1,1)'
        },
        talk: [
            '炼魂洞副本……',
            '请击杀异种炼魂洞主！',
            '你：&接受任务？'
        ],
        nextId: 2,
    },
}