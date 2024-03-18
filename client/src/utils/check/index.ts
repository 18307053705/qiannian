export function nameCheck(value: string, min = 2, max = 8) {
  // const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){2,8}$/;
  const reg = new RegExp(`^((?!\\\|\\/|:|\\*|\\?|<|>|'|%).){${min},${max}}$`, 'i')
  return reg.test(value) ? "" : `规则:不可存在特殊字符,且为${min}-${max}个字符`;
}

export function areaCheck(value: string) {
  const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){0,200}$/;
  return reg.test(value) ? "" : "规则:不可存在特殊字符,且不超过200个字符";
}

export function numCheck(value: string) {
  var reg = /^[1-9]\d{0,7}$/;
  return reg.test(value) ? "" : "规则:仅为数字,且不可超过8位";
}
