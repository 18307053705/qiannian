// 解析强化，锻造，宝石
// ☆★〖〗『』〓】
// ①②③④⑤⑥⑦⑧⑨⑩
export const getEquipName = (ext, name) => {
  const [firm, forge] = ext.split("_");
  // const forge = 50;
  // const firm = 16;
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

  if (increase < 1.5) {
    return `[普通] ${name} 强${firm}锻${forge}`;
  }
  if (increase < 3.1) {
    return `[精良] ${name} 强${firm}锻${forge}`;
  }
  if (increase < 3.6) {
    return `(优秀) ${name} 强${firm}锻${forge}`;
  }
  if (increase < 5.1) {
    return `{杰出} ${name} 强${firm}锻${forge}`;
  }
  if (increase < 6.1) {
    return `『卓越』${name} 强${firm}锻${forge}`;
  }
  if (increase < 7.1) {
    return `〖完美〗${name} 强${firm}锻${forge}`;
  }
  if (increase < 7.6) {
    return `〖史诗〗${name} 强${firm}锻${forge}`;
  }
  if (increase < 15) {
    return `★传说★${name} 强${firm}锻${forge}`;
  }
  return `☆神话☆${name} 强${firm}锻${forge}`;
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
  1: "生命",
  2: "法力",
  3: "攻击",
  4: "防御",
  5: "命中",
  6: "闪避",
  7: "暴击"
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
  const [_, __, ...gem] = ext.split("_");
  // 解析宝石
  const gemList: any[] = [];
  gem.forEach(itmes => {
    let itme = "11";
    if (itme !== "0") {
      const type = itme.substr(itme.length - 1);
      const level = itme.substr(0, itme.length - 1);
      // gemList.push(`${GEM_LEVEL[level]}级${GEM_TYPE[type]}宝石`);
      gemList.push({
        level: GEM_LEVEL[level],
        text: `${GEM_LEVEL[level]}级${GEM_TYPE[type]}宝石`
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
    gemList
  };
};
