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
    name: "组队boss",
    type: 2,
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