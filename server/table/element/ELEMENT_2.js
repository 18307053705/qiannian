// 怪物模型
const DOME_FREAK = {
  id: 1,
  name: "怪物名称",
  level: 1, // 等级
  tag: 1, // 默认1,怪物标签(1:普通地图怪,2:副本任务怪)
  type: 1, // 默认1，属性类型(1:攻击,2:防御,3:敏捷)
  attr: 1, // 默认1，属性增幅
  grade: 1, // 默认1，怪物品阶(1:普通,2:精英,3:boss)
  pet: true, // 默认false，是否可捕获
  rank: true, // 默认false，是否可组队
  creatNum: 4, // 默认4，最大生成数量
  num: -1, // 默认：无限，可击杀次数
  exp: 10000, // 默认随等级，经验
  tael: 10000, // 默认随等级，银两
  article: '1-20,2-20,3', // 默认无，掉落物品信息(id-s-rate)多个物品使用,分隔 id：物品ID,s:数量,rate:概率
  equip: '1-50,2-50,3-50,4-50,5-50', // 默认无，掉落装备信息(id-s-rate)多个物品使用,分隔 id：装备ID,rate:概率
}




const TEST = {
  2999988: {
    id: 2999988,
    name: "宝石",
    type: 2,
    level: 1,
    isRanks: true,
    article: '230-20,235-20,240-20,245-20,250-20,255-20,260-20,265-20,270-20,275-20,280-20,285-20,290-20,295-20',
  },
  2999989: {
    id: 2999989,
    name: "一阶装备boss",
    type: 2,

    level: 1,
    attr: 1,
    isRanks: true,
    article: '118-200,122-200,126-200,130-200,134-200,138-200,142-200',
  },
  2999990: {
    id: 2999990,
    name: "二阶装备boss",
    type: 2,

    level: 1,
    attr: 1,
    isRanks: true,
    article: '119-200,123-200,127-200,131-200,135-200,139-200,143-200',
  },
  2999991: {
    id: 2999991,
    name: "三阶装备boss",
    type: 2,

    level: 1,
    attr: 1,
    isRanks: true,
    article: '120-200,124-200,128-200,132-200,136-200,140-200,144-200',
  },
  2999992: {
    id: 2999992,
    name: "四阶装备boss",
    type: 2,

    level: 1,
    attr: 1,
    isRanks: true,
    article: '121-200,125-200,129-200,133-200,137-200,141-200,145-200',
  },
  2999993: {
    id: 2999993,
    name: "神装boss",
    type: 2,

    level: 1,
    attr: 1,
    isRanks: true,
    article: '309-500,310-500',
  },
  2999994: {
    id: 2999994,
    name: "声望boss",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '42-5000,43-5000,45-5000',
  },
  2999995: {
    id: 2999995,
    name: "强化材料boss",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '90-5000,91-5000,92-5000,93-5000,94-5000,95-5000,96-5000,97-5000,98-5000,99-5000,100-5000,101-5000,102-5000,103-5000,104-5000,105-5000',
  },
  2999996: {
    id: 2999996,
    name: "强化石,月光石boss",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '156-30000,157-5000',
  },
  2999997: {
    id: 2999997,
    name: "帮会材料",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '53-100,54-100,55-100,56-100,57-100,58-100,59-100,60-100',
  },
  2999998: {
    id: 2999998,
    name: "家具材料",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '296-100,297-100,298-100,299-100,300-100,301-100,302-100',
  },
  2999999: {
    id: 2999999,
    name: "聚宝盆材料",
    type: 2,
    level: 1,
    attr: 1,
    isRanks: true,
    article: '207-100,208-100,209-100,210-100,211-100,212-100,213-100,214-100,215-100,216-100,217-100,218-100,219-100,220-100,221-100',
  },
}

const ELEMENT_2 = {
  20: {
    id: 20,
    name: "巡逻山贼",
    type: 2,
    level: 1,
    pet: true,
    article: '1',
    creatNum: 2,
  },
  21: {
    id: 21,
    name: "山贼头目",
    type: 2,
    level: 3,
    pet: true,
    creatNum: 2,
  },
  22: {
    id: 22,
    name: "精英山贼",
    type: 2,
    level: 5,
    pet: true,
    creatNum: 3
  },
  23: {
    id: 23,
    name: "大当家",
    type: 2,
    level: 5,
    attr: 2,
    num: 1
  },
  24: {
    id: 24,
    name: "白魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  25: {
    id: 25,
    name: "绿魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  26: {
    id: 26,
    name: "蓝魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  27: {
    id: 27,
    name: "青魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  28: {
    id: 28,
    name: "金魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  29: {
    id: 29,
    name: "红魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  210: {
    id: 210,
    name: "紫魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  211: {
    id: 211,
    name: "炼魂郎君",
    type: 2,
    level: 1,
    attr: 1,
    num: 1,
  },
  212: {
    id: 212,
    name: "幽冥凶魂",
    type: 2,
    level: 1,
    attr: 1,
  },
  213: {
    id: 213,
    name: "幽冥凶魂",
    type: 2,
    level: 1,
    attr: 1,
  },
  214: {
    id: 214,
    name: "花草精灵",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  215: {
    id: 215,
    name: "湖中蛟龙",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  216: {
    id: 216,
    name: "竹林小妖",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  217: {
    id: 217,
    name: "古神藤龙",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  218: {
    id: 218,
    name: "月宫来客",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  219: {
    id: 219,
    name: "上古青龙",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  220: {
    id: 220,
    name: "上古朱雀",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  221: {
    id: 221,
    name: "上古玄武",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  222: {
    id: 222,
    name: "上古白虎",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  223: {
    id: 223,
    name: "上古麒麟",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  224: {
    id: 224,
    name: "上古阵灵",
    type: 2,
    isRanks: true,
    level: 1,
    attr: 1,
    num: 1,
  },
  225: {
    id: 225,
    name: "白灵子",
    type: 2,
    grade: 2,
    level: 30,
    attr: 1,
    integral: 1,
    num: 1
  },
  226: {
    id: 226,
    name: "蓝灵子",
    type: 2,
    grade: 2,
    level: 30,
    attr: 1,
    integral: 3,
    num: 1
  },
  227: {
    id: 227,
    name: "红灵子",
    type: 2,
    grade: 2,
    level: 40,
    attr: 1,
    integral: 5,
    num: 1,
  },
  228: {
    id: 228,
    name: "紫灵子",
    type: 2,
    grade: 2,
    level: 50,
    attr: 1,
    integral: 10,
    num: 1,
  },
  229: {
    id: 229,
    name: "魔化大当家",
    grade: 2,
    type: 2,
    level: 5,
    attr: 1.5,
    num: 1,
  },
  230: {
    id: 230,
    name: "妖族探子",
    type: 2,
    level: 10,
  },
  231: {
    id: 231,
    name: "仙族探子",
    type: 2,
    level: 10,
    num: 1,
  },
  232: {
    id: 232,
    name: "人族探子",
    type: 2,
    level: 10,
  },
  233: {
    id: 233,
    name: "孤魂",
    type: 2,
    level: 10,
    equip: '6-75',
  },
  234: {
    id: 234,
    name: "野鬼",
    type: 2,
    level: 10,
    equip: '7-75',
  },
  235: {
    id: 235,
    name: "皮皮猴",
    type: 2,
    level: 10,
    equip: '8-75',
  },
  236: {
    id: 236,
    name: "树妖",
    type: 2,
    level: 10,
    equip: '9-75',
  },
  237: {
    id: 237,
    name: "赤炎蜘蛛",
    type: 2,
    level: 15,
    article: '313-1-80',
    equip: '10-75',
  },
  238: {
    id: 238,
    name: "灵异小妖",
    type: 2,
    level: 15,
    article: '312-1-80',
    equip: '214-50,215-50',
  },
  239: {
    id: 239,
    name: "大泽腾蛇",
    type: 2,
    level: 20,
    equip: '11-50,16-50,21-50',
  },
  240: {
    id: 240,
    name: "金鳄鱼",
    type: 2,
    level: 20,
    equip: '12-50,17-50,22-50',
  },
  241: {
    id: 241,
    name: "黑白圣熊",
    type: 2,
    level: 20,
    equip: '13-50,18-50,23-50',
  },
  242: {
    id: 242,
    name: "大地圣熊",
    type: 2,
    level: 20,
    equip: '14-50,18-50,24-50',
  },
  243: {
    id: 243,
    name: "迷雾血蚊",
    type: 2,
    level: 20,
    equip: '15-50,19-50,25-50',
  },
  244: {
    id: 244,
    name: "迷雾蛟蛇",
    type: 2,
    level: 20,
    equip: '212-35,213-35',
  },



  20000001: {
    id: 20000001,
    name: "深渊怪(深渊模怪物占位)",
    type: 2,
  },
  //  以下为测试怪物
  ...TEST,
};

module.exports = {
  /**
   * 获取怪物信息
   * @param {*} 怪物ID
   */
  getFreak: function (id) {
    if (ELEMENT_2[id]) {
      const { tag = 1, type = 1, attr = 1, grade = 1, num = -1, ...freak } = JSON.parse(JSON.stringify(ELEMENT_2[id]));
      return {
        ...freak,
        tag,
        type, attr,
        grade,
        num
      }

    }
    return {};
  }
}