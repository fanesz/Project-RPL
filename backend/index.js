import express from "express";
import db from "./config/database.js";
import cors from "cors";


import ProdukRoutes from "./routes/ProdukRoutes.js";
import AkunRoutes from "./routes/AkunRoutes.js"
import DetailAkunRoutes from "./routes/DetailAkunRoutes.js"


const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());

app.use('/produk', ProdukRoutes);
app.use('/akun', AkunRoutes);
app.use('/detailakun', DetailAkunRoutes);



 
app.listen(5000, () => console.log('Server running at port 5000'));
