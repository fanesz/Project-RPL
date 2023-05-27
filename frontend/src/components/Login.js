import { useState } from 'react';
import axios from 'axios';
import { isLogin, setLoginCookie } from '../utils/utils'


const Login = () => {

if(isLogin()){
    window.location.href = "/";
}
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [email2, setEmail2] = useState('');
const [password2, setPassword2] = useState('');
const [email3, setEmail3] = useState('');

const createAccount = async (e) => {
    e.preventDefault();
    const listEmail = await axios.get('http://localhost:5000/account')
    for (const emails in listEmail.data) {
        if(listEmail.data[emails].email === email){
            alert("Email already terdaftar!")
            return;
        };
    }
    await axios.post('http://localhost:5000/account',{
        email: email,
        password: password
    });
    alert("Success mendaftar!")
}

const loginAccount = async (e) => {
    e.preventDefault();
    
    await axios.post('http://localhost:5000/account/login',{
        email: email2,
        password: password2
    }).then((res) => {
        if(res.data.result){
            setLoginCookie();
            window.location.href = "/";
        } else {
            alert(res.data.message);
        }
    });
    
}
const sendVerificationCode = async (e) => {
    e.preventDefault();
    const data = { email: email3 };
    await axios.post('http://localhost:5000/account/forgetpass', data).then((res) => {
        alert(res.data.message)
    })
}

<<<<<<< HEAD
const login = () => {
    setShowLoginPage(true);
    setShowForgetPassword(false);
    setShowDaftar(false);
};

const forgetPassword = () => {
    setShowForgetPassword(true);
    setShowLoginPage(false);
    setShowDaftar(false);
};


const register = () => {
    setShowForgetPassword(false);
    setShowLoginPage(false);
    setShowDaftar(true);

}
=======
>>>>>>> parent of 2d73773 (7)

return (
<div>

    login
    <form onSubmit={ loginAccount }>
        <div className="field">
            <label className="label">Email</label>
            <input
                className="input"
                type="email"
                placeholder="Your Email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}/>
                <br />
            <label className="label">Pass</label>
            <input
                className="input"
                type="password"
                placeholder="Your Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}/>
            </div>
            <button type="submit">login</button>
    </form>


<br /><br /><br />
    daftar
        
    <form onSubmit={ createAccount }>
        <div className="field">
            <label className="label">Email</label>
            <input
                className="input"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <br />
            <label className="label">Pass</label>
            <input
                className="input"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Create account</button>
    </form>

    
<br /><br /><br />
    forgetpass
        
    <form onSubmit={ sendVerificationCode }>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Your Email"
            value={email3}
            onChange={(e) => setEmail3(e.target.value)}
            />
       
        </div>
        <button type="submit">Send Verification Code</button>
      </form>
</div>
);
};

export default Login;

