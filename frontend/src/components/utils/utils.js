const isLogin = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='));
}

const loginChecker = () => {
    if(isLogin() === false){
        window.location.href = "/login";
    }
}

const setLoginCookie = () => {
    document.cookie = "loggedIn=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

const unsetLoginCookie = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const logout = () => {
    if(isLogin()){
        unsetLoginCookie()
        window.location.href = "/login";
    }
}

export { isLogin, loginChecker, setLoginCookie, unsetLoginCookie, logout }