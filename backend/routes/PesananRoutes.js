import express from "express";


import { 
    getAllPesanan,
    getPesananById,
    createPesanan,
    changeStatusPesanan
} from "../components/Pesanan.js";
 
const router = express.Router();

router.get('/', getAllPesanan);
router.get('/:id', getPesananById);
router.post('/', createPesanan);
router.post('/status', changeStatusPesanan);
 
export default router;