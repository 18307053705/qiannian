const RACE_MEUN_TYPE = {
  people: 1, // 人族
  goblin: 2, // 妖族
  immortal: 3, // 仙族
};

const RACE_TYPE = {
  [RACE_MEUN_TYPE['people']]: "人族",
  [RACE_MEUN_TYPE['goblin']]: "妖族",
  [RACE_MEUN_TYPE['immortal']]: "仙族"
};

const CAREER_TYPE = {
  1: "法皇",
  2: "战尊",
  3: "羽圣",
  4: "血煞",
  5: "战狂",
  6: "赤魅",
  7: "星君",
  8: "战神",
  9: "剑仙"
};

const SOCIALIZE_TYPE = {
  1: "陌生人",
  2: "好友",
  3: "夫妻",
  4: "帮员",
  5: "仇人",
  6: "师父",
  7: "结义",
};



module.exports = {
  RACE_MEUN_TYPE,
  RACE_TYPE,
  CAREER_TYPE,
  SOCIALIZE_TYPE
};
