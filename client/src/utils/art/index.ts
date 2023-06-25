const RP_MEUN = {
  0: "零",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七"
};

const getArtLevel = id => {
  if (id < 4) {
    return 1;
  }
  if (id < 5) {
    return 10;
  }
  if (id < 8) {
    return 30;
  }
  if (id < 13) {
    return 32 + (id - 8) * 2;
  }
  if (id === 19) {
    return 10;
  }
  return 40;
};

export const getNameInfo = art => {
  if (art.l === -1) {
    return {
      text: `${art.n}(未领悟)`,
      digest: false
    };
  }
  return {
    text: `${art.n}(${RP_MEUN[art.r]}转${art.l === -1 ? 0 : art.l}重)`,
    digest: true
  };
};

export const getSuffix = (art, role_level) => {
  const { l, r, id } = art;
  const artLevel = getArtLevel(id);
  if (l === -1 && artLevel > role_level) {
    return {
      text: `${artLevel}级可领悟`,
      isDigest: false
    };
  }
  let text = l === 13 ? "升华" : "升重";
  if (r >= 3) {
    text = l === 30 ? "升华" : "升重";
  }
  if (r >= 5) {
    text = l === 50 ? "升华" : "升重";
  }
  if (r === 7) {
    text = l === 100 ? "" : "升重";
  }
  if (l === -1 && artLevel <= role_level) {
    text = "领悟";
  }
  return {
    text,
    isDigest: text ? true : false
  };
};
