import { useState } from 'react';
import axios from 'axios';
import { isLogin } from '../utils/utils'
import { useParams, useNavigate } from 'react-router-dom';
import gambar from "../img/green-farm-blur.jpg";

const Login = () => {

const navigate = useNavigate();
if(isLogin()){
    navigate('/');
}

const { id } = useParams();

const changePassChecker = async (e) => {
    let res = await axios.get(`http://localhost:5000/akun/forgetpass/${id}`)
    console.log(res.data);
    if(!res.data.status){
        navigate('/login');
    }
}
changePassChecker();

const [password, setPassword] = useState('');

const changePass = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/akun/forgetpass/final`,{
        id: id,
        newPassword: password
    })
    if(res.data.status){
        navigate('/');
    }else {
        alert(res.data.message);
    }


}

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
        max-width: 35%;
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


    <div className="container_login card shadow-lg card-body p-5">
        <h2 className="title"><strong>Change Password</strong></h2>
        <form onSubmit={ changePass } class="needs-validation" novalidate="" autocomplete="off">
        <div className="field">
            <label className="label mb-2" for="email">New Password</label>
            <input className="form-control input mb-2" type="password" placeholder="Your New Password" value={password} onChange={(e) => setPassword(e.target.value)} required autofocus />
        </div>

        <button type="submit" class="btn btn-primary mb-4 mt-3">Change Password</button>
        </form>
    </div>

</div>
);
};

export default Login;

