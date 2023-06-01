import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImages } from "../utils/utils.js";
import fs from "fs";
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
    // gambar:{
    //     type: DataTypes.BLOB,
    // }
},{
    freezeTableName: true
});
 
//models
export const getAllProducts = async (req, res) => {
    try {
        const products = await Produk.findAll({
            attributes: ['id','idProduk','nama','deskripsi','stok','harga','berat']
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
    //   console.log(product[0]);
      product[0].dataValues["gambar"] = null;
      try {
        const imagePath = `./gambar/${product[0].dataValues.idProduk}.png`;
        const readFilePromise = new Promise((resolve, reject) => {
          fs.readFile(imagePath, (err, data) => {
            if (err) {
              return reject('Image not found');
            }
            const imageBase64 = data.toString('base64');
            const imageData = `data:image/jpeg;base64,${imageBase64}`;
            product[0].dataValues["gambar"] = imageData;
            resolve();
          });
        });
        await readFilePromise;
      } catch (error) {
        console.log(error);
      }

      product[0]["message"] = "Product Created";
      product[0]["status"] = true;
      
      res.json(product[0]);

    } catch (error) {
      console.log(error);
      res.json({
        message: error.message,
        status: false,
      });
    }
  }
  

export const createProduct = async (req, res) => {
  try {
    await Produk.create({
      idProduk: req.body.idProduk,
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      stok: req.body.stok,
      harga: req.body.harga,
      berat: req.body.berat,
    });
    saveImages(req.body.gambar, `./gambar/${req.body.idProduk}.png`);
    res.json({
      message: 'Product Created',
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      status: false,
    });
  }
};

 
export const updateProduct = async (req, res) => {
    try {
        await Produk.update({
            idProduk: req.body.idProduk,
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            stok: req.body.stok,
            harga: req.body.harga,
            berat: req.body.berat
        }, {
            where: {
                id: req.params.id
            }
        });
        saveImages(req.body.gambar, `./gambar/${req.body.idProduk}.png`);
        

        res.json({
            "message": "Product Updated",
            "status": true
        });
    } catch (error) {
        res.json({ message: error.message });
        console.log(error);
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