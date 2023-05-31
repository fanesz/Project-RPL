import express from "express";
 
import { 
    createDetailAkun,
    getAllDetailAkun,


} from "../components/DetailAkun.js";
 
const router = express.Router();
 
router.post('/', createDetailAkun);
router.get('/', getAllDetailAkun);

export default router;