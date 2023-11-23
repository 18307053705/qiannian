// 解析强化，锻造，宝石
// ☆★〖〗『』〓】
// ①②③④⑤⑥⑦⑧⑨⑩

export const getEquipExtInfo = (ext, name) => {
  const [firm, forge, sigil] = ext.split("_");
  // const forge = 10;
  // const firm = 14;
  let increase = 1 + forge * 0.1;
  if (firm < 6) {
    increase += firm * 0.1;
  } else if (firm < 11) {
    increase += 0.5 + (firm - 5) * 0.3;
  } else if (firm < 15) {
    increase += 2 + (firm - 10) * 0.5;
  } else if (firm < 16) {
    increase += 6;
  } else {
    increase += 9;
  }
  let text = "";
  // if (increase < 1.5) {
  //   text = `[普通] ${name} 强${firm}锻${forge}`;
  // } else if (increase < 3.1) {
  //   text = `[精良] ${name} 强${firm}锻${forge}`;
  // } else if (increase < 3.6) {
  //   text = `(优秀) ${name} 强${firm}锻${forge}`;
  // } else if (increase < 5.1) {
  //   text = `{杰出} ${name} 强${firm}锻${forge}`;
  // } else if (increase < 6.1) {
  //   text = `『卓越』${name} 强${firm}锻${forge}`;
  // } else if (increase < 7.1) {
  //   text = `〖完美〗${name} 强${firm}锻${forge}`;
  // } else if (increase < 7.6) {
  //   text = `〖史诗〗${name} 强${firm}锻${forge}`;
  // } else if (increase < 15) {
  //   text = `★传说★${name} 强${firm}锻${forge}`;
  // } else {
  //   text = `☆神话☆${name} 强${firm}锻${forge}`;
  // }
  // if (increase < 1.5) {
  //   text = `[普通] ${name}+${forge}`;
  // } else if (increase < 3.1) {
  //   text = `[精良] ${name}+${forge}`;
  // } else if (increase < 3.6) {
  //   text = `(优秀) ${name}+${forge}`;
  // } else if (increase < 5.1) {
  //   text = `{杰出} ${name}+${forge}`;
  // } else if (increase < 6.1) {
  //   text = `『卓越』${name}+${forge}`;
  // } else if (increase < 7.1) {
  //   text = `〖完美〗${name}+${forge}`;
  // } else if (increase < 7.6) {
  //   text = `〖史诗〗${name}+${forge}`;
  // } else if (increase < 15) {
  //   text = `★传说★${name}+${forge}`;
  // } else {
  //   text = `☆神话☆${name}+${forge}`;
  // }
  if (increase < 1.5) {
    text = `[普通] ${name}`;
  } else if (increase < 3.1) {
    text = `[精良] ${name}`;
  } else if (increase < 3.6) {
    text = `(优秀) ${name}`;
  } else if (increase < 5.1) {
    text = `{杰出} ${name}`;
  } else if (increase < 6.1) {
    text = `『卓越』${name}`;
  } else if (increase < 7.1) {
    text = `〖完美〗${name}`;
  } else if (increase < 7.6) {
    text = `〖史诗〗${name}`;
  } else if (increase < 15) {
    text = `★传说★${name}★★`;
  } else {
    text = `☆神话☆${name}☆☆`;
  }

  return {
    increase,
    firm: Number(firm),
    forge: Number(forge),
    sigil: Number(sigil),
    text
  };
};

export const getEquipName = equip => {
  if (!equip) {
    return "无";
  }
  const { ext, name, n } = equip;
  const { text } = getEquipExtInfo(ext, name || n);
  return text;
};

// life_max-最大生命
// life-当前生命
// mana_max-最大法力
// mana-当前法力
// atk-攻击
// dfs-防御
// hit-命中
// dodge-闪避
// sudden-暴击
//

const GEM_TYPE = {
  10: "生命",
  11: "法力",
  12: "攻击",
  13: "防御",
  14: "命中",
  15: "闪避",
  16: "暴击"
};

const GEM_LEVEL = {
  1: "①",
  2: "②",
  3: "③",
  4: "④",
  5: "⑤",
  6: "⑥",
  7: "⑦",
  8: "⑧",
  9: "⑨",
  10: "⑩"
};

export const getEquipInfo = equip => {
  const { ext, career } = equip;
  const [_, __, ___, ...gem] = ext.split("_");
  // 解析宝石
  const gemList: any[] = [];
  const gemNoList: any[] = [];
  gem.forEach(itme => {
    if (itme !== "0") {
      const type = itme.substr(0, 2);
      const level = itme.substr(2, 2);
      gemList.push({
        level: GEM_LEVEL[level],
        text: `${GEM_LEVEL[level]}级${GEM_TYPE[type]}宝石`,
        unload: !gemList.length
      });
    } else {
      gemNoList.push({
        text: "[未镶嵌]",
        active: !gemNoList.length
      });
    }
  });
  // 解析职业
  let careerName = "法皇,星君,血煞";
  if (career % 3 === 2) {
    careerName = "战尊,战神,战狂";
  }
  if (career % 3 === 0) {
    careerName = "羽圣,剑仙,赤魅";
  }

  return {
    careerName: career === 0 ? "全职" : careerName,
    gemList: [...gemList, ...gemNoList]
  };
};

export const EQUIP_POS_LIST = [
  {
    label: "武器",
    value: "weapon"
  },
  {
    label: "头部",
    value: "helmet"
  },
  {
    label: "衣服",
    value: "clothing"
  },
  {
    label: "腰带",
    value: "belt"
  },
  {
    label: "鞋子",
    value: "shoe"
  },
  {
    label: "戒指",
    value: "ring"
  },
  {
    label: "项链",
    value: "necklace"
  },
  {
    label: "法宝",
    value: "treasure1",
    condition: 66
  },
  {
    label: "法宝",
    value: "treasure2",
    condition: 66
  },
  {
    label: "法宝",
    value: "treasure3",
    condition: 75
  },
  {
    label: "法宝",
    value: "treasure4",
    condition: 75
  }
];
