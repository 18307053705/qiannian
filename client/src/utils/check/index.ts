export function nameCheck(value: string) {
  const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){2,8}$/;
  return reg.test(value) ? "" : "规则:不可存在特殊字符,且不超过8个字符";
}

export function areaCheck(value: string) {
  const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){0,200}$/;
  return reg.test(value) ? "" : "规则:不可存在特殊字符,且不超过200个字符";
}

export function numCheck(value: string) {
  var reg = /^[1-9]\d{0,11}$/;
  return reg.test(value) ? "" : "规则:仅为数字,且不可超过12位";
}
