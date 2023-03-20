import { useState } from 'react';
import axios from 'axios';
import { isLogin, setLoginCookie } from '../utils/utils'
import { useParams } from 'react-router-dom';

const Login = () => {

if(isLogin()){
    window.location.href = "/";
}
const [password, setPassword] = useState('');
const { id } = useParams();
const changePass = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/account/forgetpass/final`,{
        id: id,
        newPassword: password
    }).then((res) => {
        if(res.data.result){
            alert(res.data.message)
            window.location.href = "/";
        } else {
            alert(res.data.message)
            window.location.href = "/login";
        }
    })
}

return (
<div>

    forgetpass
    <form onSubmit={ changePass }>
        <div className="field">
          <label className="label">new pass</label>
          <input
            className="input"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
       
        </div>
        <button type="submit">Change pass!</button>
      </form>
</div>
);
};

export default Login;

