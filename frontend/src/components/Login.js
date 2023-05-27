import { useState } from 'react';
import axios from 'axios';
import { isLogin, setLoginCookie } from '../utils/utils'
// import { useNavigate } from 'react-router-dom';


const Login = () => {
if(isLogin()){
    window.location.href = "/";
}
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [email2, setEmail2] = useState('');
const [password2, setPassword2] = useState('');
const [email3, setEmail3] = useState('');

const [showLoginPage, setShowLoginPage] = useState(true);
const [showForgetPassword, setShowForgetPassword] = useState(false);
const [showDaftar, setShowDaftar] = useState(false);


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

return (
<div>
<style jsx global>{`
* {
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: "Open Sans", sans-serif;
  }
  body {
    height: 100vh;
    /* background-image: url(img/1.jpg); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 25px;
    width: 300px;
  
    background-color: #73e09b8f;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  .color {
    color: #ffff;
    position: absolute;
    left: 510px;
    top: 120px;
    font-size: 30px;
    background-color: red;
  }
  .container h1 {
    text-align: center;
    color: #131111;
    margin-bottom: 30px;
    text-transform: uppercase;
    border-bottom: 4px solid white;
  }
  .container label {
    text-align: center;
    color: rgb(37, 19, 19);
  }
  .container form input {
    width: calc(100% - 20px);
    padding: 8px 10px;
    margin-bottom: 15px;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid white;
    color: rgb(4, 49, 29);
    font-size: 20px;
  }
  .container form button {
    width: 100%;
    padding: 5px 0;
    border: none;
    background-color: black;
    font-size: 18px;
    color: rgb(88, 224, 133);
  }

  
  
`}
</style>


<>
      {showForgetPassword ? (
        <div className="container-forget">
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
        <p>Already have account?{" "}<a href="#" role="button" onClick={login}>Log in here</a>.</p>
        <button type="submit">Send Verification Code</button>
        </form>
        </div>

      ) : ("")}
      {showLoginPage ? (
        <div className="container-login">
          <h1>Login</h1>
          <form onSubmit={loginAccount}>
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                placeholder="Your Email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
              <br />
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="Your Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <p>Forgot your password?{" "}<a href="#" role="button" onClick={forgetPassword}>Reset it here</a>.</p>
            <button type="submit">login</button>
          </form>
            <br></br>
          <p>Dont Have Account?{" "}<a href="#" role="button" onClick={register}>Register here</a>.</p>
        </div>
      ) : ("")}

      {showDaftar ? (
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
                <p>Already have account?{" "}<a href="#" role="button" onClick={login}>Log in here</a>.</p>

        </form>
        
      ) : ("")}
    </>

{/* 
<div class="color"></div>
    <div class="container-login">
      <h1>Login</h1>
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
            <label className="label">Password</label>
            <input
                className="input"
                type="password"
                placeholder="Your Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}/>
            </div>
            <p>Forgot your password? <a href="" role="button" onClick={forgetPass()}>Reset it here</a>.</p>
            <button type="submit">login</button>
    </form>
    </div>

    <div class="container-forget">
      <h1>Input Email</h1>
      <form>
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" required />
        <button type="submit">Submit</button>
      </form>
    </div> */}


{/* 
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

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
      </form> */}
</div>
);
};

export default Login;

