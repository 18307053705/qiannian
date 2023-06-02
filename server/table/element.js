const Equip = require('./equip');
const Knapsack = require('./knapsack');

const elementType = {
  1: "NPC元素",
  2: "面板元素",
  3: "传送元素",
  4: "剧情元素",
  5: "怪物元素"
};

const ELEMENT_1 = {
  1000000: {
    id: 1000000,
    name: "送财童子",
    type: 1,
    cs: "g_b_u"
  }
};

const ELEMENT_2 = {
  2000000: {
    id: 2000000,
    name: "升级抽元宝活动...",
    type: 2,
    cs: "g_b_u",
    dir: '/roleInfo',
    ext: {

    }
  },
  2000001: {
    id: 2000001,
    name: "当天首次抽奖",
    type: 2,
    cs: "g_b_u"
  },
  2000002: {
    id: 2000002,
    name: "拍卖会",
    type: 2
  },
  2000003: {
    id: 2000003,
    name: "店铺",
    type: 2
  },
  2000004: {
    id: 2000004,
    name: "商城",
    type: 2
  },
  2000005: {
    id: 2000005,
    name: "仓库",
    type: 2
  }
};

const ELEMENT_3 = {
  3000000: {
    id: 3000000,
    name: "金银岛",
    type: 3,
    dir: "10000,0,1"
  },
  3000001: {
    id: 3000001,
    name: "九重天",
    type: 3,
    dir: "10000,1,1"
  },
  3000002: {
    id: 3000002,
    name: "灵宠山",
    type: 3
  },
  3000003: {
    id: 3000003,
    name: "彩灵洞",
    type: 3
  },
  3000004: {
    id: 3000004,
    name: "世界boss",
    type: 3
  },
  3000005: {
    id: 3000005,
    name: "上古战场",
    type: 3
  },
  3000006: {
    id: 3000006,
    name: "时间回廊",
    type: 3
  },
  3000007: {
    id: 3000007,
    name: "宝山",
    type: 3
  }
};

const ELEMENT_5 = {
  5000000: {
    id: 5000000,
    name: "紫草冰精",
    type: 5,
    ext: {
      career: 1,
      level: 100,
      attr: 10,
      boss: true,
    },
    article: [
      {
        ...Knapsack[1],
        num:5,
      },
      Knapsack[2],
      {
        ...Equip[1],
        rate: 20
      },
      {
        ...Equip[2],
        rate: 40
      },
      {
        ...Equip[3],
        rate: 80
      },
    ]
  },
  5000001: {
    id: 5000001,
    name: "虾兵蟹将",
    type: 5,
    ext: {
      career: 1,
      level: 100,
      attr: 5
    }
  },
  5000002: {
    id: 5000002,
    name: "九天神龙",
    type: 5
  },
  5000003: {
    id: 5000003,
    name: "元素1.0",
    type: 5
  },
  5000004: {
    id: 5000004,
    name: "元素1.1",
    type: 5
  },
  5000005: {
    id: 5000005,
    name: "元素1.2",
    type: 5
  },
  5000006: {
    id: 5000006,
    name: "元素1.3",
    type: 5
  },
  5000007: {
    id: 5000007,
    name: "元素2.1",
    type: 5
  },
  5000008: {
    id: 5000008,
    name: "元素0.3",
    type: 5
  },
  5000009: {
    id: 5000009,
    name: "元素2.2",
    type: 5
  }
};

module.exports = {
  ELEMENT_1,
  ELEMENT_2,
  ELEMENT_3,
  ELEMENT_5
};
