// 技能类型p 1:单攻 2:群攻 3:buff 4:天赋 5:宠物天赋
// 基础数值v 升级增加up 转生rp 消耗d 目标数量t
// 增伤 atk 吸血 suck 破防 ignore
module.exports = {
    getCareerArts: function (career) {
        // 根据职业获取技能集
        const arts = [4, 8, 9, 10, 11, 12, 13, 14];
        if (career % 3 === 1) {
            return [1, 5, ...arts];
        }
        if (career % 3 === 2) {
            return [2, 6, ...arts];
        }
        return [3, 7, ...arts];
    },
    1: {
        id: 1,
        p: 1,
        n: '诸天道法',
        v: 150,
        d: 100,
        up: 20,
        rp: 50,
        condition: 1,
        effect: {
            atk: 10
        },
        msg: '对单个目标造成&[v]&%伤害,四转可领悟增幅&[e]&%伤害。'
    },
    2: {
        id: 2,
        p: 1,
        n: '嗜血封魔',
        v: 150,
        d: 100,
        up: 20,
        rp: 50,
        condition: 1,
        effect: {
            suck: 10
        },
        msg: '对单个目标造成&[v]&%伤害,四转可领悟造成伤害&[e]&%的生命恢复。'
    },
    3: {
        id: 3,
        p: 1,
        n: '九幽断魂',
        v: 150,
        d: 100,
        up: 10,
        rp: 20,
        condition: 1,
        effect: {
            ignore: 10
        },
        msg: '对单个目标造成&[v]&%伤害,四转可领悟无视目标&[e]&%防御。'
    },
    4: {
        id: 4,
        p: 2,
        n: '无上大道',
        v: 120,
        up: 10,
        rp: 20,
        d: 120,
        t: 2,
        condition: 10,
        msg: '对&[t]&个目标目标造成&[v]&%伤害,四转后可增加攻击目标。'
    },
    5: {
        id: 5,
        p: 3,
        n: '黄泉天怒',
        v: {
            atk: 100,
            sudden: 20
        },
        d: 1000,
        t: 5,
        condition: 30,
        effect: {
            atk: 100,
            sudden: 20
        },
        msg: '本次战斗提升&[v]&攻击与&[v]&暴击,持续&[t]&回合。'
    },
    6: {
        id: 6,
        p: 3,
        n: '大天造化',
        v: {
            life: 1000,
            dfs: 50
        },
        d: 1000,
        t: 5,
        condition: 30,
        effect: {
            life: 1000,
            dfs: 50
        },
        msg: '本次战斗提升&[v]&生命与&[v]&防御,持续&[t]&回合。'
    },
    7: {
        id: 7,
        p: 3,
        n: '追星逐月',
        v: {
            hit: 20,
            dodge: 20,
        },
        t: 5,
        d: 1000,
        condition: 30,
        effect: {
            hit: 20,
            dodge: 20,
        },
        msg: '本次战斗提升&[v]&命中与&[v]&闪避,持续&[t]&回合。'
    },
    8: {
        id: 8,
        p: 4,
        n: '黄泉诀',
        v: {
            life: 1000,
        },
        effect: {
            life: 500,  // 1.5 2 3 4 5 7 10
        },
        condition: 32,
        msg: '提升&[v]&生命上限。'
    },
    9: {
        id: 9,
        p: 4,
        n: '圣灵诀',
        v: {
            mana: 1000,
        },
        effect: {
            mana: 500,
        },
        condition: 34,
        msg: '提升&[v]&法力上限。'
    },
    10: {
        id: 10,
        p: 4,
        n: '鬼神诀',
        v: {
            atk: 100,
        },
        effect: {
            atk: 50,
        },
        condition: 36,
        msg: '提升&[v]&攻击上限。'
    },
    11: {
        id: 11,
        p: 4,
        n: '琉璃诀',
        v: {
            dfs: 40,
        },
        effect: {
            dfs: 20,
        },
        condition: 38,
        msg: '提升&[v]&防御上限。'
    },
    12: {
        id: 12,
        p: 4,
        n: '洞虚诀',
        v: {
            hit: 20,
        },
        effect: {
            hit: 10,
        },
        condition: 40,
        msg: '提升&[v]&命中上限。'
    },
    13: {
        id: 13,
        p: 4,
        n: '无影诀',
        v: {
            dodge: 20,
        },
        effect: {
            dodge: 10,
        },
        condition: 40,
        msg: '提升&[v]&闪避上限。'
    },
    14: {
        id: 14,
        p: 4,
        n: '鬼煞诀',
        v: {
            sudden: 20,
        },
        effect: {
            sudden: 10,
        },
        condition: 40,
        msg: '提升&[v]&暴击上限。'
    },
    15: {
        id: 15,
        n: '青帝雷经',
        v: 200,
        d: 100,
        effect:'ignore-10',
        msg: '对单个目标造成&[v]&%伤害,并无视&[e]&%防御。'
    },
    16: {
        id: 16,
        n: '太白帝经',
        v: 200,
        effect:'atk-10',
        msg: '对单个目标造成&[v]&%伤害,最终伤害+&[e]&%。'
    },
    17: {
        id: 17,
        n: '玄武真怒',
        v: 200,
        condition: 1,
        effect:'life-1',
        msg: '对单个目标造成&[v]&%伤害,附加额外自身生命&[v]&%的伤害。'
    },
    18: {
        id: 18,
        n: '白虹贯日',
        v: 200,
        condition: 1,
        msg: '对单个目标造成&[v]&%伤害。'
    },
    19: {
        id: 19,
        p: 5,
        n: '附体',
        v: 10,
        condition: 1,
        msg: '可提升玩家生命上限,附加值为&[v]&%生命值。'
    },
}

