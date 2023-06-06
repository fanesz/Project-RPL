import express from "express";
import bodyParser from "body-parser";


import { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByIdProduk,
    getTotalTerjualById,
} from "../components/Produk.js";
 
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/idProduk', getProductByIdProduk);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/terjual/:id', getTotalTerjualById);

export default router;