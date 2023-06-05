import express from "express";
 
import { 
    createDetailAkun,
    getDetailAkunById,
    getAlamatById,
    updateAlamat,
    updateDetailAkun


} from "../components/DetailAkun.js";
 
const router = express.Router();
 
router.post('/create', createDetailAkun);
router.post('/update', updateDetailAkun);
router.get('/:id', getDetailAkunById);

// alamat
router.get('/alamat/:id', getAlamatById);
router.post('/alamat/update', updateAlamat);

export default router;