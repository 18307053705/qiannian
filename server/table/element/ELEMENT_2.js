// // 完整的怪物设置
// const DOME_FREAK = {
//   id: 2000000,
//   name: "持刀山贼",
//   type: 5,
//   ext: { // 额外描述
//     level: 1, // 等级,必填
//     career: 1, // 职业,可选默认1
//     attr: 0.5, // 属性加成,可选默认1
//     pet: true, // 是否可被捕获,可选默认false
//     num: 2, // 击杀次数,可选默认无限
//     exps: 10000, // 击杀经验,可选默认无
//     taels: 10000, // 击杀银两,可选默认无
//   },
//   article: [ // 掉落物品信息,可选默认[]
//     {
//       id: 54, // 物品id,必填
//       s: 20, // 物品数量,可选默认1
//       rate: 20 // 物品掉落概率,可选默认100
//     }
//   ],
//   equip: [ // 掉落装备信息,可选默认[]
//     {
//       id: 54, // 物品id,必填
//       rate: 20 // 物品掉落概率,可选默认100
//     }
//   ]
// }

const ELEMENT_2 = {
  2000000: {
    id: 2000000,
    name: "持刀山贼",
    type: 5,
    ext: {
      career: 1,
      level: 1,
      attr: 0.5,
      pet: true,
      num: 2,
      exps: 10000,
    },
    article: [
      {
        id: 1,
        s: 20
      },
      {
        id: 2,
        s: 20
      },
    ],
    equip: [
      {
        id: 1,
        rate: 50
      },
      {
        id: 2,
        rate: 50
      },
      {
        id: 3,
        rate: 50
      },
      {
        id: 4,
        rate: 50
      },
      {
        id: 5,
        rate: 50
      },
    ]
  },
  2000001: {
    id: 2000001,
    name: "持斧山贼",
    type: 5,
    ext: {
      level: 1
    },
    equip: [
      {
        id: 121,
      },
      {
        id: 120,
      }
    ]
  },
  2000002: {
    id: 2000002,
    name: "大当家",
    type: 5,
    ext: {
      career: 1,
      level: 5,
      attr: 1,
      boss: true
    }
  },
  2000003: {
    id: 2000003,
    name: "组队boss",
    type: 5,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    }
  },
};

module.exports = {
  ELEMENT_2
}