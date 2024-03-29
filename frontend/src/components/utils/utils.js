const isLogin = () => {
  return document.cookie.split(';').some((item) => item.trim().startsWith('loginId='));
}

const loginChecker = () => {
  if(!isLogin()){
    window.location.href = "/login";
  }
}

const setLoginCookie = (id) => {
  document.cookie = `loginId=${id}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

const unsetLoginCookie = () => {
  document.cookie = "loginId=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getLoginCookie = () => {
  return ((document.cookie).split('='))[1]
}

const logout = () => {
  if(isLogin()){
    unsetLoginCookie()
    window.location.href = "/login";
  }
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
const updateLocalStorage = (key, valueKey, newValue) => {
  const cartItems = JSON.parse(localStorage.getItem(key)) || {};
  cartItems[valueKey] = newValue;
  localStorage.setItem(key, JSON.stringify(cartItems));
}
const unsetLocalStorage = (key) => {
  localStorage.removeItem(key);
}
const getLocalStorage = (key) => {
  let value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}


export { 
  isLogin, 
  loginChecker, 
  setLoginCookie, 
  unsetLoginCookie,
  getLoginCookie,
  logout, 
  setLocalStorage,
  unsetLocalStorage,
  getLocalStorage,
  updateLocalStorage,
  
}