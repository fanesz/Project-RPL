import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Produk = db.define('produk',{
    // id:{
    //     type: DataTypes.STRING,
    //     primaryKey: true,
    //     allowNull: false
    // },
    idProduk:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi:{
        type: DataTypes.STRING,
    },
    berat:{
        type: DataTypes.DOUBLE,
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
    }
},{
    freezeTableName: true
});
 
//models
export const getAllProducts = async (req, res) => {
    try {
        const products = await Produk.findAll({
            attributes: ['id','idProduk','nama','deskripsi','stok','harga','berat','gambar']
        });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getProductById = async (req, res) => {
    try {
        const product = await Produk.findAll({
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
        await Produk.create(req.body);
        res.json({
            "message": "Product Created",
            "status": true
        });
    } catch (error) {
        res.json({ message: error.message, "status": false });
    }  
}
 
export const updateProduct = async (req, res) => {
    try {
        await Produk.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteProduct = async (req, res) => {
    try {
        await Produk.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}