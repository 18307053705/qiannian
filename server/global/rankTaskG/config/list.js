const RANK_TASK_TYPE = {
    qingyuan: 1,
    xiulianfang: 2,
}
// 副本坐标
const ADDRESS_LIST = [
    '60001',
    '60002',
]

const RANK_TASKS = {
    1: {
        id: 1,
        title: '落叶谷',
        type: RANK_TASK_TYPE.qingyuan,
        receive: [
            "天下万物，皆有因果轮回，情缘亦是如此！",
            "你今日踏入落叶谷，心有所感。",
            "你决定：&开启情劫",
        ],
        fun: 'qingYuan1',
        done: '经验+100000,姻缘树+10,姻缘果+1',
        freak: [
            {
                id: 2060,
                address: '60001,0,1',
            },
            {
                id: 2061,
                address: '60001,0,2',
            },
            {
                id: 2062,
                address: '60001,0,3',
            },
            {
                id: 2063,
                address: '60001,0,4',
            },
            {
                id: 2064,
                address: '60001,0,5'
            },
        ],
    },
    2: {
        id: 2,
        title: '修炼房',
        type: RANK_TASK_TYPE.xiulianfang,
        receive: [
            "修炼大阵，据说封印着强大的上古神兽。",
            "击败它们可获得大量的经验与积分。",
            "&开启修炼",
        ],
        fun: 'gang1',
        done: '经验+500000,神装积分+1',
        freak: [
            {
                id: 2065,
                address: '60002,0,1',
            },
            {
                id: 2066,
                address: '60002,0,2',
            },
            {
                id: 2067,
                address: '60002,0,3',
            },
            {
                id: 2068,
                address: '60002,0,4',
            },
            {
                id: 2069,
                address: '60002,0,5'
            },
        ],
    }
}

module.exports = {
    RANK_TASKS,
    RANK_TASK_TYPE,
    ADDRESS_LIST
}