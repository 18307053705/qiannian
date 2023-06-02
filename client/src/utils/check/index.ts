
export function nameCheck(value: string) {
  const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){2,8}$/;
   return reg.test(value) ? '' : '规则:不可存在特殊字符,且不超过8个字符';
}
