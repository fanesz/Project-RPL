import express from "express";
 
import { 
    createAccount,
    getAllEmail

} from "../components/Account.js";
 
const router = express.Router();
 
router.post('/', createAccount);
router.get('/', getAllEmail);

export default router;