import express from "express";
import db from "./config/database.js";
import cors from "cors";


import ProdukRoutes from "./routes/ProdukRoutes.js";
import AkunRoutes from "./routes/AkunRoutes.js"
import DetailAkunRoutes from "./routes/DetailAkunRoutes.js"
import PesananRoutes from "./routes/PesananRoutes.js"


const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.use('/produk', ProdukRoutes);
app.use('/akun', AkunRoutes);
app.use('/detailakun', DetailAkunRoutes);
app.use('/pesanan', PesananRoutes);



 
app.listen(5000, () => console.log('Server running at port 5000'));
