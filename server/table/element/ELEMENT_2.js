// // 完整的怪物设置
// const DOME_FREAK = {
//   id: 2000000,
//   name: "持刀山贼",
//   type: 2,
//   ext: { // 额外描述
//     level: 1, // 等级,必填
//     career: 1, // 职业,可选默认1
//     attr: 0.5, // 属性加成,可选默认1
//     pet: true, // 是否可被捕获,可选默认false
//     num: 2, // 击杀次数,可选默认无限
//     exps: 10000, // 击杀经验,可选默认无
//     taels: 10000, // 击杀银两,可选默认无
//   },
//   article:'1-20,2-20,3' // 可选,掉落物品信息:id-s-rate 多个物品使用,分隔
//   equip: '1-50,2-50,3-50,4-50,5-50' // 可选,掉落装备信息:id-rate 多个物品使用,分隔
// }

const ELEMENT_2 = {
  2000000: {
    id: 2000000,
    name: "持刀山贼",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 0.5,
      pet: true,
      num: 2,
      exps: 10000,
    },
    article: '1-20,2-20,3',
    equip: '1-50,2-50,3-50,4-50,5-50',
  },
  2000001: {
    id: 2000001,
    name: "持斧山贼",
    type: 2,
    ext: {
      level: 1
    },
    equip: '121,122',
  },
  2000002: {
    id: 2000002,
    name: "大当家",
    type: 2,
    ext: {
      career: 1,
      level: 100,
      attr: 10,
      boss: true
    },
    article: '230-20,235-20,240-20,245-20,250-20,255-20,260-20,265-20,270-20,275-20,280-20,285-20,290-20,295-20',
  },
  2000003: {
    id: 2000003,
    name: "一阶装备boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '118-200,122-200,126-200,130-200,134-200,138-200,142-200',
  },
  2000004: {
    id: 2000004,
    name: "二阶装备boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '119-200,123-200,127-200,131-200,135-200,139-200,143-200',
  },
  2000005: {
    id: 2000005,
    name: "三阶装备boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '120-200,124-200,128-200,132-200,136-200,140-200,144-200',
  },
  2000006: {
    id: 2000006,
    name: "四阶装备boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '121-200,125-200,129-200,133-200,137-200,141-200,145-200',
  },
  2000007: {
    id: 2000007,
    name: "神装boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '309-500,310-500',
  },
  2000008: {
    id: 2000008,
    name: "声望boss",
    type: 2,
    ext: {
      career: 1,
      level: 1,
      attr: 1,
      isRanks: true
    },
    article: '42-5000,43-5000,45-5000',
  },
};

module.exports = {
  ELEMENT_2
}