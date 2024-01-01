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

export const getNameInfo = ({ l, n, r }) => {
  return l === 0
    ? `${n}(未领悟)`
    : `${n}(${RP_MEUN[r]}转${l}重)`;
};

export const getSuffix = (art, level) => {
  const { l, r, condition = 0, id } = art;
  if (condition > level) {
    return {
      text: `${condition}级可领悟`,
      suffixClass: ""
    };
  }
  if (l === 0 && condition <= level) {
    return {
      text: "领悟",
      suffixClass: "g_color"
    };
  }
  if (r === 7 || (id === 60 && l === 9)) {
    return {
      text: "",
      suffixClass: ""
    };
  }

  let text = "升重";
  if (13 === l && r === 0) {
    text = "升华";
  }
  if (32 === l && r === 1) {
    text = "升华";
  }
  if (50 === l && r === 2) {
    text = "升华";
  }
  if (70 === l && r === 3) {
    text = "升华";
  }
  if (80 === l && r === 4) {
    text = "升华";
  }
  if (90 === l && r === 5) {
    text = "升华";
  }
  if (100 === l && r === 6) {
    text = "升华";
  }

  return {
    text,
    suffixClass: text ? "g_color" : ""
  };
};
