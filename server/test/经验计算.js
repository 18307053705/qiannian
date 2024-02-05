
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

function analyDailyReward(level) {
    const exps = computeUpExp(level);
    let exp = 0;
    switch (Math.floor(level / 10)) {
        case 0:
        case 1:
            exp = exps * 0.25;
            break;
        case 2:
            exp = exps * 0.125;
            break;
        case 3:
            exp = exps * 0.0625;
            break;
        case 4:
            exp = exps * 0.0425;
            break;
        case 5:
            exp = exps * (level > 55 ? 0.025 : 0.032);
            break;
        case 6:
            exp = exps * (level > 65 ? 0.02 : 0.025);
            break;
        case 7:
            exp = exps * 0.0125;
            break;
        case 8:
            exp = exps * 0.007;
            break;
        case 9:
            exp = exps * 0.003;
            break;
        default:
            exp = 5100000;
            break
    }
    return {
        exps,
        exp: parseInt(exp)
    };
}



function taskUp(num = 100) {
    let nS = 0;
    for (let i = 1; i <= num; i++) {
        const { exps, exp } = analyDailyReward(i);
        const s = Math.floor(exps / exp);
        const d = Math.floor(s / 8);
        nS += s;
        console.log('等级:', i, '经验:', exps, '任务:', exp, '次数:', s, '天:', d)
    }
    console.log('总次数:', nS, '总天:', Math.floor(nS / 8))
}