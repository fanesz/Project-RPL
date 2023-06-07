import express from "express";
 
import { 
  getAllRekening,
  getRekeningById

} from "../components/Informasi.js";
 
const router = express.Router();
 
router.get('/rekening/', getAllRekening);
router.get('/rekening/:id', getRekeningById);

export default router;