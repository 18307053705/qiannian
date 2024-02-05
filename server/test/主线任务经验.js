// 计算经验
function computeUpExp(level) {
    switch (parseInt(level / 10)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            return 100 * (10 ** parseInt(level / 10)) * (level % 10 + 1);
        case 5:
            return 10000000 + (level % 10 + 1) * 5000000;
        case 6:
            return 50000000 + (level % 10 + 1) * 5000000;
        case 7:
            return 100000000 + (level % 10 + 1) * 10000000;
        case 8:
            return 300000000 + (level % 10 + 1) * 20000000;
        case 9:
            return 500000000 + (level % 10 + 1) * 50000000;
        case 10:
        case 11:
            return 1000000000 + (level - 100) * 500000000;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            return 50000000000 + (level - 120) * 1000000000;
        default:
            return 100000000000 + (level - 180) * 50000000000;
    }

}

function taskExp(taskMap) {
    // 总经验
    let exps = 0;
    // 当前经验
    let curExp = 0;
    // 当前等级
    let level = 1;
    let upExp = computeUpExp(level);
    Object.values(taskMap).forEach(({ title, reward }) => {
        exps += reward.exp;
        curExp += reward.exp;
        console.log('任务:', title, '经验:', reward.exp, '总经验:', exps);
        // 计算经验
        if (curExp >= upExp) {
            curExp -= upExp;
            level++;
            upExp = computeUpExp(level);
            console.log('任务:', title, '恭喜你升到', level, '级！');
        }



    })
}

const TASK_TYPE = {
    zhandou: 1, // 战斗
    duihau: 2, // 对话
    shouji: 3, // 收集
    biaoxiang: 4, // 宝箱
    migong: 5, // 迷宫
    task: 6, // 任务战斗
}

taskExp()