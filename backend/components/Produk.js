import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Product = db.define('produk',{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    kode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi:{
        type: DataTypes.STRING,
        allowNull: false
    },
    berat:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    warna:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stok:{
        type: DataTypes.STRING,
        allowNull: false
    },
    harga:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    gambar:{
        type: DataTypes.BLOB,
        allowNull: false
    }
},{
    freezeTableName: true
});
 
//models
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: ['id','kode','nama','deskripsi','stok','harga','berat','warna','gambar']
        });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
// export const updateProduct = async (req, res) => {
//     try {
//         await Product.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "message": "Product Updated"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }  
// }
 
// export const deleteProduct = async (req, res) => {
//     try {
//         await Product.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "message": "Product Deleted"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }  
// }