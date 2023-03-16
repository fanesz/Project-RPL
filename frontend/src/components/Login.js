import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    
  const createAccount = async (e) => {
      e.preventDefault();
      
      const listEmail = await axios.get('http://localhost:5000/account')
      for (const emails in listEmail.data) {
          if(listEmail.data[emails].email == email){
              alert("Email already terdaftar!")
              return;
            };
        }
        
        
        await axios.post('http://localhost:5000/account',{
            email: email,
            password: password
        });
        alert("Success mendaftar!")
        history.push("/");
    }
    
    return (
        <div>

      <form onSubmit={ createAccount }>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /><br />
          <label className="label">Pass</label>
          <input
            className="input"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default Login;

