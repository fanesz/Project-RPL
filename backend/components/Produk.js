import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImage, deleteImage } from "../utils/utils.js";
import fs from "fs";
import { query_select } from "../utils/query.js";
const { DataTypes } = Sequelize;

 
const Produk = db.define('produk',{
  idProduk:{type: DataTypes.STRING,allowNull: false},
  nama:{type: DataTypes.STRING,allowNull: false},
  deskripsi:{type: DataTypes.STRING,},
  berat:{type: DataTypes.DOUBLE,},
  stok:{type: DataTypes.STRING,allowNull: false},
  harga:{type: DataTypes.DECIMAL,allowNull: false},
},{freezeTableName: true});
 
//models
export const getAllProducts = async (req, res) => {
  
    try {
        const products = await Produk.findAll();

        for(let key in products){
          products[key].dataValues["gambar"] = null
          try {
            const imagePath = `./gambar/${products[key].dataValues.idProduk}.png`;
            const readFilePromise = new Promise((resolve, reject) => {
              fs.readFile(imagePath, (err, data) => {
                if (err) {
                  return reject('Image not found');
                }
                const imageBase64 = data.toString('base64');
                const imageData = `data:image/jpeg;base64,${imageBase64}`;
                products[key].dataValues["gambar"] = imageData;
                resolve();
              });
            });
            await readFilePromise;
          } catch (error) {
          }
        }
        res.json(products);
    } catch (error) {
      res.json({ message: error.message });
    }  
}

export const getProductById = async (req, res) => {
    try {
      const product = await Produk.findAll({
        where: {
          idProduk: req.params.id
        }
      });
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
      }

      product[0]["message"] = "Product Created";
      product[0]["status"] = true;
      
      res.json(product[0]);
    } catch (error) {
      res.json({
        message: error.message,
        status: false,
      });
    }
}

export const getProductByIdProduk = async (req, res) => {
    try {
      let whereClause = "";
      for(let id in req.body.idProduk){
        whereClause += ` idProduk='${req.body.idProduk[id]}' OR`
      }
      whereClause = whereClause.slice(0, -2)
      const product = await (query_select("SELECT * FROM produk WHERE"+whereClause))


      for (let i = 0; i < product.length; i++) {
        product[i]["gambar"] = null;
        try {
          const imagePath = `./gambar/${product[i].idProduk}.png`;
          const readFilePromise = new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
              if (err) { return reject(""); }
              const imageBase64 = data.toString('base64');
              const imageData = `data:image/jpeg;base64,${imageBase64}`;
              product[i]["gambar"] = imageData;
              resolve();
            });
          });
          await readFilePromise;
        } catch (error) {
        }
      }

      res.json(product);

    } catch (error) {
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
        saveImage(req.body.gambar, `./gambar/${req.body.idProduk}.png`);
        res.json({
            message: 'Product Created',
            status: true,
        });
    } catch (error) {
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
        saveImage(req.body.gambar, `./gambar/${req.body.idProduk}.png`);
        

        res.json({
            message: "Product Updated",
            status: true
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
  
 
export const deleteProduct = async (req, res) => {
    try {
        const product = await Produk.findAll({
            where: {
              id: req.params.id
            }
        });
        deleteImage(product[0].dataValues.idProduk);
        await Produk.destroy({
            where: {
              id: req.params.id
            }
        });
        res.json({
            message: "Product Deleted",
            status: true
        });
    } catch (error) {
        res.json({ 
            message: error.message ,
            status: false
        });
    }  
}

export const getTotalTerjualById = async (req, res) => {
  try {
    const query = (await query_select(`SELECT coalesce(SUM(jumlah), 0) as terjual FROM detailPesanan, pesanan WHERE detailPesanan.idPesanan = pesanan.idPesanan AND idProduk = '${req.params.id}' and status = 'Sudah Terkirim'`))[0];
    res.json(query);
  } catch (error) {
    res.json({ message: error.message });
  }
}