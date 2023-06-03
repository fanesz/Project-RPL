import express from "express";


import { 
    getAllPesanan,
    getPesananById,
    createPesanan
} from "../components/Pesanan.js";
 
const router = express.Router();

router.get('/', getAllPesanan);
router.post('/id', getPesananById);
router.post('/', createPesanan);
 
export default router;