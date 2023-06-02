function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value};`;
}

function getCookie(key: string) {
  const cookies = document.cookie; // 获取所有cookie
  const cookiesArr = cookies.split("; "); // ["name=pengpeng", "age=18", "desc=shuai"]

  const itme = cookiesArr.find((itme)=>(itme.split('=')[0] === key));
  if(itme){
    return itme.split('=')[1]
  }
  return null;
}

export { setCookie, getCookie };
