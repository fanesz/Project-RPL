import express from "express";
 
import { 
  getAllUserAccount,
  loginAccount,
  sendVerificationCode,
  changePasswordPage,
  changePassword,
  aksesChecker

} from "../components/Akun.js";
 
const router = express.Router();
 
router.get('/', getAllUserAccount);
router.get('/akses/:id', aksesChecker);
router.post('/login', loginAccount);
router.post('/forgetpass', sendVerificationCode);
router.get('/forgetpass/:id', changePasswordPage);
router.post('/forgetpass/final', changePassword);

export default router;