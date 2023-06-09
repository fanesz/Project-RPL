import { useState } from "react";
import axios from "axios";
import { isLogin, setLoginCookie, unsetLoginCookie } from "../utils/utils";
import gambar from "../img/green-farm-blur.jpg";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  if (isLogin()) {
    window.location.href = "/";
  }
  console.log(isLogin());
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [email3, setEmail3] = useState("");

  const [showLoginPage, setShowLoginPage] = useState(true);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showDaftar, setShowDaftar] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/detailakun/create", {
      email: email,
      password: password,
    });
    if(res.data.status){
      alert(res.data.message);
      login();
    } else {
      alert(res.data.message);
    }
  };

  const loginAccount = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/akun/login", {
      email: email2,
      password: password2,
    })
    if(res.data.status){
      unsetLoginCookie();
      setLoginCookie(res.data.sessionId);
      if(res.data.akses === 'admin'){
        navigate('/admin');
      } else if(res.data.akses === 'seller'){
        navigate('/seller');
      } else {
        navigate('/');
      }
    } else {
      alert(res.data.message);
    }
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    const data = { email: email3 };
    const res = await axios.post("http://localhost:5000/akun/forgetpass", data)
    if(res.data.status){
        alert(res.data.message);
        navigate('/');
    } else {
        alert(res.data.message);
    }
  };

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
  };

  return (
    <div>
      <style jsx global>
        {`
          body {
            background-image: url(${gambar});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            overflow-x: hidden;
            padding-top: 15vh;
        }
        .container_login{
            max-width: 35rem;
            margin-left: auto;
            margin-right: auto;
            padding: 4rem;
        }
        .title{
            text-align: center;
            margin-bottom: 2.5rem;
            font-size: 2.3rem;
        }
        `}
      </style>

      <>

      {showLoginPage ? (
        <div className="container_login card shadow-lg card-body p-5">
            <h2 className="title"><strong>Login</strong></h2>
            <form method="POST" className="needs-validation" autocomplete="off" onSubmit={ loginAccount }>
                <div className="field">
                    <label className="label mb-2">Email</label>
                    <input className="input form-control  mb-3" type="email" placeholder="Enter Your Email" value={email2} onChange={(e) => setEmail2(e.target.value)} required autofocus />
                    <label className="label mb-2" for="password">Password</label>
                    <input className="input form-control  mb-2" type="password" placeholder="Your Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                </div>
                <p>Forgot your password? <a href="#/" role="button" onClick={ forgetPassword }> Forgot Password</a>.</p>
                <button type="submit" className="btn btn-primary mb-4">Login</button>
            </form>
            <div className="card-footer border-0 text-center py-3">
                Don't Have Account? <a href="#/" role="button" onClick={ register }>Register here</a>.
            </div>
        </div>
        ) : ("")}

       {showForgetPassword ? (
          <div className="container_login card shadow-lg card-body p-5">
              <h2 className="title"><strong>Forgot Password</strong></h2>
              <form onSubmit={ sendVerificationCode } class="needs-validation" novalidate="" autocomplete="off">
                <div className="field">
                    <label className="label mb-2" for="email">Email</label>
                    <input id="email" className="form-control input mb-2" type="email" placeholder="Your Email" value={email3} onChange={(e) => setEmail3(e.target.value)} required autofocus />
                </div>
                <p>Already have account? <a href="#/" role="button" onClick={ login }>Log in here</a>.</p>
                <button type="submit" class="btn btn-primary mb-4">Send Verification Code</button>
              </form>
          </div>
        ) : ("")}



        {showDaftar ? (
          <div className="container_login card shadow-lg card-body p-5">
            <h2 className="title"><strong>Register</strong></h2>
            <form onSubmit={ createAccount } class="needs-validation" novalidate="" autocomplete="off">
                <div className="field">
                    <label className="label mb-2">Email</label>
                    <input className="form-control mb-3" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className="label mb-2">Password</label>
                    <input className="form-control mb-2" type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <p>Already have account? <a href="#/" role="button" onClick={ login }>Log in here</a>.</p>
                <button type="submit" className="btn btn-primary mb-4">Create account</button>
            </form>
          </div>
        ) : ("")}
      </>
    </div>
  );
};

export default Login;
