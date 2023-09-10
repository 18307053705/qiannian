const RANK_TASK_TYPE = {
    qingyuan: 1,
    xiulianfang: 2,
}
// 副本坐标
const ADDRESS_LIST = [
    '60001'
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
        fun: 'qingYuan',
        freak: [
            {
                id: 214,
                address: '60001,0,1',
            },
            {
                id: 215,
                address: '60001,0,2',
            },
            {
                id: 216,
                address: '60001,0,3',
            },
            {
                id: 217,
                address: '60001,0,4',
            },
            {
                id: 218,
                address: '60001,0,5',
            },
        ],
    }
}

module.exports = {
    RANK_TASKS,
    RANK_TASK_TYPE,
    ADDRESS_LIST
}