import express from "express";
 
import { 
    getAllProducts
} from "../components/Produk.js";
 
const router = express.Router();
 
router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.post('/', createProduct);
// router.patch('/:id', updateProduct);
// router.delete('/:id', deleteProduct);
 
export default router;