const { TASK_TYPE } = require('./enum');
module.exports = {
    130: {
        title: "淬体初期",
        tips: "灰色古籍就在仙隐村(1,1)，翻开看看吧。",
        type: TASK_TYPE.duihau,
        receive: [
            "我穿越了千年,在无尽的岁月长河中沉睡,最终忘却了一切,只为重回千年前……",
            "神秘声音：醒醒,快点醒醒!",
            "一道犹如风铃般的声音将你从沉睡中唤醒,你睁开眼发现面前是一卷灰色古籍。",
            "&翻开灰色古籍",
        ],
        done: [
            "古籍中记载了一段千年前的隐秘......",
            "千年前一位名为东坡先生的大能制作出四个馒头，分别献给了人，仙，妖三族族长。",
            "三族族长吃下馒头后实力暴涨，心中皆是衍生出称霸三族的念头。",
            "不过三族族长都吃过馒头，实力不相上下，于是都想将最后一个馒头占为己有，一场惊世大战因此爆发。",
            "神秘声音：&醒醒，快点醒醒！",
        ],
        reward: {
            exp: 500,
            article: '100-30,101-30'
        },
        grand: {
            npc: {
                id: 100,
                address: "10000,0,0"
            },
        },
        nextId: 101
    },
    121: {
        type: TASK_TYPE.zhandou,
        title: '惩戒持刀山贼',
        tips: '持刀山贼就在仙隐村(1,2)，快去将他们击败吧。',
        complete: { freak: '20012-8' },
        level: 29
    },
    122: {
        type: TASK_TYPE.zhandou,
        title: '惩戒持斧山贼',
        tips: '持斧山贼就在仙隐村(1,3)，快去将他们击败吧。',
        complete: { freak: '20013-8' },
        level: 29
    },
    123: {
        type: TASK_TYPE.zhandou,
        title: '惩戒精英山贼',
        tips: '精英山贼就在仙隐村(1,3)，快去将他们击败吧。',
        complete: { freak: '20014-8' },
        level: 29
    },
    124: {
        type: TASK_TYPE.zhandou,
        title: '惩戒孤魂',
        tips: '孤魂就在云荒大陆(1,2)，快去将他们击败吧。',
        complete: { freak: '20411-8' },
        level: 29
    },
    125: {
        type: TASK_TYPE.zhandou,
        title: '惩戒野鬼',
        tips: '野鬼就在云荒大陆(1,2)，快去将他们击败吧。',
        complete: { freak: '20412-8' },
        level: 29
    },
    126: {
        type: TASK_TYPE.zhandou,
        title: '惩戒树妖',
        tips: '树妖就在云荒大陆(1,3)，快去将他们击败吧。',
        complete: { freak: '20413-8' },
        level: 29
    },
    127: {
        type: TASK_TYPE.shouji,
        title: '收集桑果',
        tips: '桑树就在云荒大陆(1,3)，击杀后有概率掉落桑果。',
        complete: { article: "2113-2" },
        level: 29
    },
    128: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(1)',
        tips: '骷髅剑客就在无妄海(1,1)，快去将它们击杀吧。',
        complete: { freak: '20421-15' },
        level: 49
    },
    129: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(2)',
        tips: '骷髅刀客就在无妄海(1,1)，快去将它们击杀吧。',
        complete: { freak: '20422-15' },
        level: 49
    },
    1210: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(3)',
        tips: '神秘触手就在无妄海(1,2)，快去将它们击杀吧。',
        complete: { freak: '20423-15' },
        level: 49
    },
    1211: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(4)',
        tips: '八爪章鱼就在无妄海(1,2)，快去将它们击杀吧。',
        complete: { freak: '20424-15' },
        level: 49
    },
    1212: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(5)',
        tips: '海底亡魂就在无妄海(1,3)，快去将它们击杀吧。',
        complete: { freak: '20425-15' },
        level: 49
    },
    1213: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(6)',
        tips: '海底怨魂就在无妄海(1,3)，快去将它们击杀吧。',
        complete: { freak: '20426-15' },
        level: 49
    },
    1214: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(7)',
        tips: '骷髅骑士就在无妄海(1,4)，快去将它们击杀吧。',
        complete: { freak: '20427-15' },
        level: 49
    },
    1215: {
        type: TASK_TYPE.zhandou,
        title: '无妄海之乱(8)',
        tips: '骷髅护卫就在无妄海(1,4)，快去将它们击杀吧。',
        complete: { freak: '20428-15' },
        level: 49
    },
    1216: {
        type: TASK_TYPE.zhandou,
        title: '惩戒虾兵',
        tips: '虾兵就在南海琉璃宫(1,1)，快去将它们击杀吧。',
        complete: { freak: '20431-20' },
        level: 9999
    },
    1217: {
        type: TASK_TYPE.zhandou,
        title: '惩戒蟹将',
        tips: '蟹将就在南海琉璃宫(1,1)，快去将它们击杀吧。',
        complete: { freak: '20432-20' },
        level: 9999
    },
    1218: {
        type: TASK_TYPE.zhandou,
        title: '紫草冰精',
        tips: '紫草冰精就在南海琉璃宫(1,1)，快去将它们击杀吧。',
        complete: { freak: '20433-20' },
        level: 9999
    },
    1219: {
        type: TASK_TYPE.zhandou,
        title: '雷电神马',
        tips: '雷电神马就在南海琉璃宫(1,1)，快去将它们击杀吧。',
        complete: { freak: '20434-20' },
        level: 9999
    },
}