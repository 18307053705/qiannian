// 解析强化，锻造，宝石
// ☆★〖〗『』〓】
export const getEquipName = (ext, name) => {
  // const [firm, forge] = ext.split("_");
  const forge = 50;
  const firm = 16;
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
    return `[普通]${name}+${firm}`;
  }
  if (increase < 3.1) {
    return `[精良]${name}+${firm}`;
  }
  if (increase < 3.6) {
    return `[优秀]${name}+${firm}`;
  }
  if (increase < 5.1) {
    return `{杰出}${name}+${firm}`;
  }
  if (increase < 6.1) {
    return `『卓越』${name}+${firm}`;
  }
  if (increase < 7.1) {
    return `〖完美〗${name}+${firm}`;
  }
  if (increase < 7.6) {
    return `〖史诗〗${name}+${firm}`;
  }
  if (increase < 15) {
    return `★传说★${name}+${firm}`;
  }
  return `☆神话☆${name}+${firm}`;
};
