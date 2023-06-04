import express from "express";
 
import { 
    createDetailAkun,
    getAllDetailAkun,
    getAllDetailAkunByIdAkun


} from "../components/DetailAkun.js";
 
const router = express.Router();
 
router.post('/create', createDetailAkun);
router.get('/', getAllDetailAkun);
router.post('/', getAllDetailAkunByIdAkun);

export default router;