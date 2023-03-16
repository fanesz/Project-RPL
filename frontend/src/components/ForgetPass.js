import { useState } from 'react';
import axios from 'axios';

const ForgetPass = () => {
const [email, setEmail] = useState('');

const sendVerificationCode = async (e) => {
    e.preventDefault();
    // alert("tes")
    const data = { email: email };

    await axios.post('http://localhost:5000/api/forgetpass', data).then((res) => {
        alert(res.data.message)
    })
    

    // await fetch('http://localhost:5000/api/forgetpass', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(response => {
    //     console.log(response);
    //     alert('Response:', response);
    // })
    // .catch(error => {
    //       console.log(error);
    //     alert('Error:', error);
    //   });
}

  return (
    <div>
      <form onSubmit={ sendVerificationCode }>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Verification Code</button>
      </form>
    </div>
  );
};

export default ForgetPass;
