import express from "express";
 
import { 
    createDetailAkun,
    getAllDetailAkun,
    getAllDetailAkunByIdAkun,
    getAlamatById,
    updateAlamat


} from "../components/DetailAkun.js";
 
const router = express.Router();
 
router.post('/create', createDetailAkun);
router.get('/', getAllDetailAkun);
router.post('/', getAllDetailAkunByIdAkun);

router.post('/alamat', getAlamatById);
router.post('/alamat/update', updateAlamat);

export default router;