
// import { useNavigate } from 'react-router-dom';
import {Mailer} from '../utils/Mailer'
 
const ForgetPass = () => {

    const sendMail = async (e) => {
        await Mailer.sendMail(e)
    }
  
    return (
        <div>

            <form onSubmit={ sendMail }>
                <div className="field">
                    <label className="label">Email</label>
                    <input 
                        className="input"
                        type="email"
                        placeholder="Your Email"
                    />
                </div>
            </form>

        </div>
       
    )
}
 
export default ForgetPass