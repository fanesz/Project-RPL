import express from "express";
 
import { 
    sendVerificationCode,
    createAccount,
    getAllUserAccount,
    loginAccount,
    changePasswordPage,
    changePassword

} from "../components/Account.js";
 
const router = express.Router();
 
router.post('/', createAccount);
router.get('/', getAllUserAccount);
router.post('/login', loginAccount);
router.post('/forgetpass', sendVerificationCode);
router.get('/forgetpass/:id', changePasswordPage);
router.post('/forgetpass/final', changePassword);

export default router;