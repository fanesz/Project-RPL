import express from "express";
import db from "./config/database.js";
import cors from "cors";


import productRoutes from "./routes/productRoutes.js";
import accountRoutes from "./routes/AccountRoutes.js"
// import mailer from "./config/mailer.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/account', accountRoutes);
// app.use('/api/forgetpass', mailer)


 
app.listen(5000, () => console.log('Server running at port 5000'));
