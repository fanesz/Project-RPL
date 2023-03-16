const isLogin = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='));
}

const loginChecker = async() => {
    if(isLogin() === false){
        window.location.href = "/login";
    } else {
        window.location.href = "/";
    }
}

export { isLogin, loginChecker }