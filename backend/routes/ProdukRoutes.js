import express from "express";
import bodyParser from "body-parser";


import { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByIdProduk
} from "../components/Produk.js";
 
const router = express.Router();


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/keranjang', getProductByIdProduk);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
 
export default router;