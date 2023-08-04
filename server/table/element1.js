const Equip = require('./equip');
const Knapsack = require('./knapsack');


const getArticle = (stratId, len, s = 5) => {
  const article = []
  for (let index = 0; index < len; index++) {
    const articleId = stratId + index;
    if (Knapsack[articleId]) {
      article.push({
        ...Knapsack[articleId],
        s
      })
    }

  }
  return article;
}

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
    name: "拎壶冲",
    type: 1,
  },
  1000001: {
    id: 1000001,
    name: "胡晶丽",
    type: 1,
  },
  1000002: {
    id: 1000002,
    name: "太白金星",
    type: 1
  },

  // 1000001: {
  //   id: 1000001,
  //   name: "送财童子",
  //   type: 1,
  //   cs: "g_b_u"
  // },
  // 1000001: {
  //   id: 1000001,
  //   name: "天机老人",
  //   type: 1
  // },
  // 1000002: {
  //   id: 1000002,
  //   name: "白胡子老人",
  //   type: 1
  // }
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
    type: 2,
    dir: '/shopping',
  },
  2000004: {
    id: 2000004,
    name: "商城",
    type: 2,
    dir: '/shops',
  },
  2000005: {
    id: 2000005,
    name: "仓库",
    type: 2,
    dir: '/warehouse',
    ext: {
      type: 3
    }
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
    name: "持刀山贼",
    type: 5,
    ext: {
      career: 1,
      level: 1,
      attr: 0.5,
      pet: true,
      num:2
    },
  },
  5000001: {
    id: 5000001,
    name: "持斧山贼",
    type: 5,
    ext: {
      career: 1,
      level: 5,
      attr: 1,
      pet: true
    }
  },
  5000002: {
    id: 5000002,
    name: "大当家",
    type: 5,
    ext: {
      career: 1,
      level: 5,
      attr: 1,
      boss: true
    }
  },
  5000003: {
    id: 5000003,
    name: "组队boss",
    type: 5,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      // boss: true,
      isRanks: true
    }
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
  },
  5000010: {
    id: 5000010,
    name: "魔尊分身",
    type: 5,
    ext: {
      career: 1,
      level: 50,
      attr: 10
    }
  },
  5000011: {
    id: 5000011,
    name: "魔尊重楼",
    type: 5,
    ext: {
      career: 1,
      level: 100,
      attr: 10
    }
  },
  5000012: {
    id: 5000012,
    name: "帮会材料怪",
    type: 5,
    ext: {
      career: 1,
      level: 30,
      attr: 1
    },
    article: [
      {
        ...Knapsack[54],
        s: 5,
      },
      {
        ...Knapsack[55],
        s: 5,
      },
      {
        ...Knapsack[56],
        s: 5,
      },
      {
        ...Knapsack[57],
        s: 5,
      },
      {
        ...Knapsack[58],
        s: 5,
      },
      {
        ...Knapsack[59],
        s: 1,
      },
      {
        ...Knapsack[67],
        s: 100,
      },
      {
        ...Knapsack[68],
        s: 100,
      },
      {
        ...Knapsack[69],
        s: 100,
      },
      {
        ...Knapsack[70],
        s: 100,
      },
      {
        ...Knapsack[71],
        s: 100,
      },
      {
        ...Knapsack[72],
        s: 100,
      },
      {
        ...Knapsack[73],
        s: 100,
      },
      {
        ...Knapsack[74],
        s: 100,
      },
      {
        ...Knapsack[75],
        s: 100,
      },
      {
        ...Knapsack[76],
        s: 100,
      },
      {
        ...Knapsack[77],
        s: 100,
      },
      {
        ...Knapsack[78],
        s: 100,
      },
      {
        ...Knapsack[79],
        s: 100,
      },
      {
        ...Knapsack[80],
        s: 100,
      },
      {
        ...Knapsack[81],
        s: 100,
      },
      {
        ...Knapsack[82],
        s: 100,
      },
      {
        ...Knapsack[83],
        s: 100,
      },
      {
        ...Knapsack[84],
        s: 100,
      },
      {
        ...Knapsack[85],
        s: 100,
      },
      {
        ...Knapsack[86],
        s: 100,
      },
      {
        ...Knapsack[87],
        s: 100,
      },
      {
        ...Knapsack[88],
        s: 100,
      },
      {
        ...Knapsack[89],
        s: 100,
      },
    ]
  },
  5000013: {
    id: 5000013,
    name: "装备材料怪",
    type: 5,
    ext: {
      career: 1,
      level: 30,
      attr: 1
    },
    article: [
      ...getArticle(147, 9),
      ...getArticle(90, 16),
      ...getArticle(106, 12),
      {
        ...Knapsack[156],
        s: 99999,
      },
      {
        ...Knapsack[157],
        s: 99999,
      },
    ]
  },
  5000014: {
    id: 5000014,
    name: "丹药怪",
    type: 5,
    ext: {
      career: 1,
      level: 20,
      attr: 1
    },
    article: [
      ...getArticle(1, 46, 20),
    ]
  },
  5000015: {
    id: 5000015,
    name: "宠物怪",
    type: 5,
    ext: {
      career: 1,
      level: 20,
      attr: 1
    },
    article: [
      ...getArticle(158, 5, 20),
    ]
  },
  5000016: {
    id: 5000016,
    name: "装备怪",
    type: 5,
    ext: {
      career: 1,
      level: 20,
      attr: 1
    },
    article: [
      Equip[1],
      Equip[2],
      Equip[3],
      Equip[4],
      Equip[5],
      Equip[120],
      Equip[121],
    ]
  },
  5000017: {
    id: 5000017,
    name: "聚宝盆怪",
    type: 5,
    ext: {
      career: 1,
      level: 20,
      attr: 1
    },
    article: [
      ...getArticle(207, 14, 2000),
    ]
  },

};
module.exports = {
  ELEMENT_1,
  ELEMENT_2,
  ELEMENT_3,
  ELEMENT_5
};
