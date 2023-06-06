
const Attribute = require("./attribute");

const EQUIP_ATTR = {
    1: {
        pos: 'weapon',
        attr: ['atk_min', 'atk_max']
    },
    2: {
        pos: 'helmet',
        attr: ['mana']
    },
    3: {
        pos: 'clothing',
        attr: ['life']
    },
    4: {
        pos: 'belt',
        attr: ['dfs_min', 'dfs_max']
    },
    5: {
        pos: 'shoe',
        attr: ['dodge']
    },
    6: {
        pos: 'ring',
        attr: ['hit']
    },
    7: {
        pos: 'necklace',
        attr: ['sudden']
    },
    8: {
        pos: 'treasure1',
        attr: ['atk']
    }
};
module.exports = {
    // 计算装备属性
    computeAttr: function (equip, ext) {
        const { pos, career, attr, level } = equip
        // 解析强化，锻造，宝石
        const [firm, forge, ...gem] = ext.split('_');
        let Increase = 1 + forge * 0.1;
        if (firm < 6) {
            Increase += firm * 0.1
        } else if (firm < 11) {
            Increase += 0.5 + (firm - 5) * 0.3
        }
        else if (firm < 15) {
            Increase += 2 + (firm - 10) * 0.5
        }
        else if (firm < 16) {
            Increase += 6
        } else {
            Increase += 9
        }

        const equipAttr = {};
        const posInfo = EQUIP_ATTR[pos];
        const base = Attribute.getAttr(career);

        posInfo.attr.forEach((key) => {
            equipAttr[key] = parseInt(base[key] * attr * level * Increase);
        })
        return {
            attr: equipAttr,
            posName: posInfo.pos
        }

    },
    1: {
        id: 1,
        type: 3,
        name: '新手☆木剑',
        career: 0,
        level: 1,
        pos: 1,
        attr: 5,
        group: 10000,
        // ext: {
        //     attr: 'atk'
        // },

    },
    2: {
        id: 2,
        type: 3,
        name: '新手☆头巾',
        career: 0,
        level: 1,
        pos: 2,
        attr: 5,
        group: 10000
    },
    3: {
        id: 3,
        type: 3,
        name: '新手☆布衣',
        career: 0,
        level: 1,
        pos: 3,
        attr: 5,
        group: 10000
    },
    4: {
        id: 4,
        type: 3,
        name: '新手☆腰带',
        career: 0,
        level: 1,
        pos: 4,
        attr: 5,
        group: 10000
    },
    5: {
        id: 5,
        type: 3,
        name: '新手☆草鞋',
        career: 0,
        level: 1,
        pos: 5,
        attr: 5,
        group: 10000
    },
    6: {
        id: 6,
        type: 3,
        name: '紫金剑',
        career: 0,
        level: 10,
        pos: 1,
        attr: 3,
        group: 10001
    },
    7: {
        id: 7,
        type: 3,
        name: '紫金盔',
        career: 0,
        level: 10,
        pos: 2,
        attr: 3,
        group: 10001
    },
    8: {
        id: 8,
        type: 3,
        name: '紫金甲',
        career: 0,
        level: 10,
        pos: 3,
        attr: 3,
        group: 10001
    },
    9: {
        id: 9,
        type: 3,
        name: '紫金带',
        career: 0,
        level: 10,
        pos: 4,
        attr: 3,
        group: 10001
    },
    10: {
        id: 10,
        type: 3,
        name: '紫金靴',
        career: 0,
        level: 10,
        pos: 5,
        attr: 3,
        group: 10001
    },
    11: {
        id: 11,
        type: 3,
        name: '皇极法杖',
        career: 1,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10002
    },
    12: {
        id: 12,
        type: 3,
        name: '皇极头巾',
        career: 1,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10002
    },
    13: {
        id: 13,
        type: 3,
        name: '皇极法袍',
        career: 1,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10002
    },
    14: {
        id: 14,
        type: 3,
        name: '皇极束带',
        career: 1,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10002
    },
    15: {
        id: 15,
        type: 3,
        name: '皇极布鞋',
        career: 1,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10002
    },
    16: {
        id: 16,
        type: 3,
        name: '皇鼎长枪',
        career: 2,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10003
    },
    17: {
        id: 17,
        type: 3,
        name: '皇鼎头盔',
        career: 2,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10003
    },
    18: {
        id: 18,
        type: 3,
        name: '皇鼎战恺',
        career: 2,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10003
    },
    19: {
        id: 19,
        type: 3,
        name: '皇鼎腰带',
        career: 2,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10003
    },
    20: {
        id: 20,
        type: 3,
        name: '皇鼎战靴',
        career: 2,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10003
    },
    21: {
        id: 21,
        type: 3,
        name: '皇泽长弓',
        career: 3,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10004
    },
    22: {
        id: 22,
        type: 3,
        name: '皇泽头巾',
        career: 3,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10004
    },
    23: {
        id: 23,
        type: 3,
        name: '皇泽皮衣',
        career: 3,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10004
    },
    24: {
        id: 24,
        type: 3,
        name: '皇泽腰带',
        career: 3,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10004
    },
    25: {
        id: 25,
        type: 3,
        name: '皇泽长靴',
        career: 3,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10004
    },
    26: {
        id: 26,
        type: 3,
        name: '星辰法杖',
        career: 1,
        level: 35,
        pos: 1,
        attr: 2,
        group: 10005
    },
    27: {
        id: 27,
        type: 3,
        name: '星辰头巾',
        career: 1,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10005
    },
    28: {
        id: 28,
        type: 3,
        name: '星辰法袍',
        career: 1,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10005
    },
    29: {
        id: 29,
        type: 3,
        name: '星辰束带',
        career: 1,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10005
    },
    30: {
        id: 30,
        type: 3,
        name: '星辰布鞋',
        career: 1,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10005
    },
    31: {
        id: 31,
        type: 3,
        name: '玉尊战戟',
        career: 2,
        level: 35,
        pos: 1,
        attr: 2,
        group: 10006
    },
    32: {
        id: 32,
        type: 3,
        name: '玉尊战盔',
        career: 2,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10006
    },
    33: {
        id: 33,
        type: 3,
        name: '玉尊战甲',
        career: 2,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10006
    },
    34: {
        id: 34,
        type: 3,
        name: '玉尊战带',
        career: 2,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10006
    },
    35: {
        id: 35,
        type: 3,
        name: '玉尊战靴',
        career: 2,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10006
    },
    36: {
        id: 36,
        type: 3,
        name: '凌影长剑',
        career: 1,
        level: 35,
        pos: 1,
        attr: 1,
        group: 10007
    },
    37: {
        id: 37,
        type: 3,
        name: '凌影头巾',
        career: 3,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10007
    },
    38: {
        id: 38,
        type: 3,
        name: '凌影长衣',
        career: 3,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10007
    },
    39: {
        id: 39,
        type: 3,
        name: '凌影玉束',
        career: 3,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10007
    },
    40: {
        id: 40,
        type: 3,
        name: '凌影布鞋',
        career: 3,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10007
    },
    41: {
        id: 41,
        type: 3,
        name: '九歌法杖',
        career: 1,
        level: 55,
        pos: 1,
        attr: 2,
        group: 10008
    },
    42: {
        id: 42,
        type: 3,
        name: '九歌头巾',
        career: 1,
        level: 55,
        pos: 2,
        attr: 2,
        group: 10008
    },
    43: {
        id: 43,
        type: 3,
        name: '九歌法袍',
        career: 1,
        level: 55,
        pos: 3,
        attr: 2,
        group: 10008
    },
    44: {
        id: 44,
        type: 3,
        name: '九歌束带',
        career: 1,
        level: 55,
        pos: 4,
        attr: 2,
        group: 10008
    },
    45: {
        id: 45,
        type: 3,
        name: '九歌布鞋',
        career: 1,
        level: 55,
        pos: 5,
        attr: 2,
        group: 10008
    },
    46: {
        id: 46,
        type: 3,
        name: '九衡战戟',
        career: 2,
        level: 55,
        pos: 1,
        attr: 2,
        group: 10009
    },
    47: {
        id: 47,
        type: 3,
        name: '九衡战盔',
        career: 2,
        level: 55,
        pos: 2,
        attr: 2,
        group: 10009
    },
    48: {
        id: 48,
        type: 3,
        name: '九衡战甲',
        career: 2,
        level: 55,
        pos: 3,
        attr: 2,
        group: 10009
    },
    49: {
        id: 49,
        type: 3,
        name: '九衡战带',
        career: 2,
        level: 55,
        pos: 4,
        attr: 2,
        group: 10009
    },
    50: {
        id: 50,
        type: 3,
        name: '九衡战靴',
        career: 2,
        level: 55,
        pos: 5,
        attr: 2,
        group: 10009
    },
    51: {
        id: 51,
        type: 3,
        name: '九御长剑',
        career: 1,
        level: 55,
        pos: 1,
        attr: 1,
        group: 10010
    },
    52: {
        id: 52,
        type: 3,
        name: '九御头巾',
        career: 3,
        level: 55,
        pos: 2,
        attr: 2,
        group: 10010
    },
    53: {
        id: 53,
        type: 3,
        name: '九御长衣',
        career: 3,
        level: 55,
        pos: 3,
        attr: 2,
        group: 10010
    },
    54: {
        id: 54,
        type: 3,
        name: '九御玉束',
        career: 3,
        level: 55,
        pos: 4,
        attr: 2,
        group: 10010
    },
    55: {
        id: 55,
        type: 3,
        name: '九御布鞋',
        career: 3,
        level: 55,
        pos: 5,
        attr: 2,
        group: 10010
    },
    56: {
        id: 56,
        type: 3,
        name: '金光法杖',
        career: 1,
        level: 70,
        pos: 1,
        attr: 2,
        group: 10011
    },
    57: {
        id: 57,
        type: 3,
        name: '金光头巾',
        career: 1,
        level: 70,
        pos: 2,
        attr: 2,
        group: 10011
    },
    58: {
        id: 58,
        type: 3,
        name: '金光法袍',
        career: 1,
        level: 70,
        pos: 3,
        attr: 2,
        group: 10011
    },
    59: {
        id: 59,
        type: 3,
        name: '金光束带',
        career: 1,
        level: 70,
        pos: 4,
        attr: 2,
        group: 10011
    },
    60: {
        id: 60,
        type: 3,
        name: '金光布鞋',
        career: 1,
        level: 70,
        pos: 5,
        attr: 2,
        group: 10011
    },
    61: {
        id: 61,
        type: 3,
        name: '御光战戟',
        career: 2,
        level: 70,
        pos: 1,
        attr: 2,
        group: 10012
    },
    62: {
        id: 62,
        type: 3,
        name: '御光战盔',
        career: 2,
        level: 70,
        pos: 2,
        attr: 2,
        group: 10012
    },
    63: {
        id: 63,
        type: 3,
        name: '御光战甲',
        career: 2,
        level: 70,
        pos: 3,
        attr: 2,
        group: 10012
    },
    64: {
        id: 64,
        type: 3,
        name: '御光战带',
        career: 2,
        level: 70,
        pos: 4,
        attr: 2,
        group: 10012
    },
    65: {
        id: 65,
        type: 3,
        name: '御光战靴',
        career: 2,
        level: 70,
        pos: 5,
        attr: 2,
        group: 10012
    },
    66: {
        id: 66,
        type: 3,
        name: '流光长剑',
        career: 1,
        level: 70,
        pos: 1,
        attr: 1,
        group: 10013
    },
    67: {
        id: 67,
        type: 3,
        name: '流光头巾',
        career: 3,
        level: 70,
        pos: 2,
        attr: 2,
        group: 10013
    },
    68: {
        id: 68,
        type: 3,
        name: '流光长衣',
        career: 3,
        level: 70,
        pos: 3,
        attr: 2,
        group: 10013
    },
    69: {
        id: 69,
        type: 3,
        name: '流光玉束',
        career: 3,
        level: 70,
        pos: 4,
        attr: 2,
        group: 10013
    },
    70: {
        id: 70,
        type: 3,
        name: '流光布鞋',
        career: 3,
        level: 70,
        pos: 5,
        attr: 2,
        group: 10013
    },
    71: {
        id: 71,
        type: 3,
        name: '无极☆法杖',
        career: 1,
        level: 80,
        pos: 1,
        attr: 2,
        group: 10014
    },
    72: {
        id: 72,
        type: 3,
        name: '无极☆头巾',
        career: 1,
        level: 80,
        pos: 2,
        attr: 2,
        group: 10014
    },
    73: {
        id: 73,
        type: 3,
        name: '无极☆法袍',
        career: 1,
        level: 80,
        pos: 3,
        attr: 2,
        group: 10014
    },
    74: {
        id: 74,
        type: 3,
        name: '无极☆束带',
        career: 1,
        level: 80,
        pos: 4,
        attr: 2,
        group: 10014
    },
    75: {
        id: 75,
        type: 3,
        name: '无极☆布鞋',
        career: 1,
        level: 80,
        pos: 5,
        attr: 2,
        group: 10014
    },
    76: {
        id: 76,
        type: 3,
        name: '守元☆战戟',
        career: 2,
        level: 80,
        pos: 1,
        attr: 2,
        group: 10015
    },
    77: {
        id: 77,
        type: 3,
        name: '守元☆战盔',
        career: 2,
        level: 80,
        pos: 2,
        attr: 2,
        group: 10015
    },
    78: {
        id: 78,
        type: 3,
        name: '守元☆战甲',
        career: 2,
        level: 80,
        pos: 3,
        attr: 2,
        group: 10015
    },
    79: {
        id: 79,
        type: 3,
        name: '守元☆战带',
        career: 2,
        level: 80,
        pos: 4,
        attr: 2,
        group: 10015
    },
    80: {
        id: 80,
        type: 3,
        name: '守元☆战靴',
        career: 2,
        level: 80,
        pos: 5,
        attr: 2,
        group: 10015
    },
    81: {
        id: 81,
        type: 3,
        name: '遁一☆长剑',
        career: 1,
        level: 80,
        pos: 1,
        attr: 1,
        group: 10016
    },
    82: {
        id: 82,
        type: 3,
        name: '遁一☆头巾',
        career: 3,
        level: 80,
        pos: 2,
        attr: 2,
        group: 10016
    },
    83: {
        id: 83,
        type: 3,
        name: '遁一☆长衣',
        career: 3,
        level: 80,
        pos: 3,
        attr: 2,
        group: 10016
    },
    84: {
        id: 84,
        type: 3,
        name: '遁一☆玉束',
        career: 3,
        level: 80,
        pos: 4,
        attr: 2,
        group: 10016
    },
    85: {
        id: 85,
        type: 3,
        name: '遁一☆布鞋',
        career: 3,
        level: 80,
        pos: 5,
        attr: 2,
        group: 10016
    },
    86: {
        id: 86,
        type: 3,
        name: '生死☆法杖',
        career: 1,
        level: 90,
        pos: 1,
        attr: 3,
        group: 10017
    },
    87: {
        id: 87,
        type: 3,
        name: '生死☆头巾',
        career: 1,
        level: 90,
        pos: 2,
        attr: 3,
        group: 10017
    },
    88: {
        id: 88,
        type: 3,
        name: '生死☆法袍',
        career: 1,
        level: 90,
        pos: 3,
        attr: 3,
        group: 10017
    },
    89: {
        id: 89,
        type: 3,
        name: '生死☆束带',
        career: 1,
        level: 90,
        pos: 4,
        attr: 3,
        group: 10017
    },
    90: {
        id: 90,
        type: 3,
        name: '生死☆布鞋',
        career: 1,
        level: 90,
        pos: 5,
        attr: 3,
        group: 10017
    },
    91: {
        id: 91,
        type: 3,
        name: '永恒☆战戟',
        career: 2,
        level: 90,
        pos: 1,
        attr: 3,
        group: 10018
    },
    92: {
        id: 92,
        type: 3,
        name: '永恒☆战盔',
        career: 2,
        level: 90,
        pos: 2,
        attr: 3,
        group: 10018
    },
    93: {
        id: 93,
        type: 3,
        name: '永恒☆战甲',
        career: 2,
        level: 90,
        pos: 3,
        attr: 3,
        group: 10018
    },
    94: {
        id: 94,
        type: 3,
        name: '永恒☆战带',
        career: 2,
        level: 90,
        pos: 4,
        attr: 3,
        group: 10018
    },
    95: {
        id: 95,
        type: 3,
        name: '永恒☆战靴',
        career: 2,
        level: 90,
        pos: 5,
        attr: 3,
        group: 10018
    },
    96: {
        id: 96,
        type: 3,
        name: '御仙☆古剑',
        career: 1,
        level: 90,
        pos: 1,
        attr: 3,
        group: 10019
    },
    97: {
        id: 97,
        type: 3,
        name: '御仙☆头巾',
        career: 3,
        level: 90,
        pos: 2,
        attr: 3,
        group: 10019
    },
    98: {
        id: 98,
        type: 3,
        name: '御仙☆长衣',
        career: 3,
        level: 90,
        pos: 3,
        attr: 3,
        group: 10019
    },
    99: {
        id: 99,
        type: 3,
        name: '御仙☆玉束',
        career: 3,
        level: 90,
        pos: 4,
        attr: 3,
        group: 10019
    },
    100: {
        id: 100,
        type: 3,
        name: '御仙☆布鞋',
        career: 3,
        level: 90,
        pos: 5,
        attr: 3,
        group: 10019
    },
    101: {
        id: 101,
        type: 3,
        name: '黄泉☆法杖',
        career: 1,
        level: 100,
        pos: 1,
        attr: 5,
        group: 10020
    },
    102: {
        id: 102,
        type: 3,
        name: '黄泉☆头巾',
        career: 1,
        level: 100,
        pos: 2,
        attr: 5,
        group: 10020
    },
    103: {
        id: 103,
        type: 3,
        name: '黄泉☆法袍',
        career: 1,
        level: 100,
        pos: 3,
        attr: 5,
        group: 10020
    },
    104: {
        id: 104,
        type: 3,
        name: '黄泉☆束带',
        career: 1,
        level: 100,
        pos: 4,
        attr: 5,
        group: 10020
    },
    105: {
        id: 105,
        type: 3,
        name: '黄泉☆布鞋',
        career: 1,
        level: 100,
        pos: 5,
        attr: 5,
        group: 10020
    },
    106: {
        id: 106,
        type: 3,
        name: '碧落☆战戟',
        career: 2,
        level: 100,
        pos: 1,
        attr: 5,
        group: 10021
    },
    107: {
        id: 107,
        type: 3,
        name: '碧落☆战盔',
        career: 2,
        level: 100,
        pos: 2,
        attr: 5,
        group: 10021
    },
    108: {
        id: 108,
        type: 3,
        name: '碧落☆战甲',
        career: 2,
        level: 100,
        pos: 3,
        attr: 5,
        group: 10021
    },
    109: {
        id: 109,
        type: 3,
        name: '碧落☆战带',
        career: 2,
        level: 100,
        pos: 4,
        attr: 5,
        group: 10021
    },
    110: {
        id: 110,
        type: 3,
        name: '碧落☆战靴',
        career: 2,
        level: 100,
        pos: 5,
        attr: 5,
        group: 10021
    },
    111: {
        id: 111,
        type: 3,
        name: '轮回☆古剑',
        career: 1,
        level: 100,
        pos: 1,
        attr: 5,
        group: 10022
    },
    112: {
        id: 112,
        type: 3,
        name: '轮回☆头巾',
        career: 3,
        level: 100,
        pos: 2,
        attr: 5,
        group: 10022
    },
    113: {
        id: 113,
        type: 3,
        name: '轮回☆长衣',
        career: 3,
        level: 100,
        pos: 3,
        attr: 5,
        group: 10022
    },
    114: {
        id: 114,
        type: 3,
        name: '轮回☆玉束',
        career: 3,
        level: 100,
        pos: 4,
        attr: 5,
        group: 10022
    },
    115: {
        id: 115,
        type: 3,
        name: '轮回☆布鞋',
        career: 3,
        level: 100,
        pos: 5,
        attr: 5,
        group: 10022
    },
}



