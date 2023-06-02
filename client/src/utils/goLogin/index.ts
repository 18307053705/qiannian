import Cookies from 'js-cookie';
export function goLogin() {
  // 非登录页的情况，校验登陆态，进行拦截
  if (!Cookies.get("token") && window.location.pathname !== "/login") {
    window.location.pathname = "/login";
  }
}

export function goHoem() {
  // 非登录页的情况，校验登陆态，进行拦截
  // 指令异常
  window.location.pathname = "/";
}