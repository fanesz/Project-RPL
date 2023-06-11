import express from "express";
 
import { 
  getAllRekening,
  getRekeningById,
  CheckTablesExistence

} from "../components/Informasi.js";
 
const router = express.Router();
 
router.get('/rekening/', getAllRekening);
router.get('/rekening/:id', getRekeningById);
router.get('/table', CheckTablesExistence);

export default router;