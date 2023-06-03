import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImage, deleteImage, generateIdPesanan, convertTimestamp } from "../utils/utils.js";
import fs from "fs";
import { query_select } from "../utils/query.js";
const { DataTypes } = Sequelize;

 
const Pesanan = db.define('pesanan',{
    idPesanan:{type: DataTypes.STRING,allowNull: false},
    idAkun:{type: DataTypes.STRING,allowNull: false},
    total:{type: DataTypes.DOUBLE,allowNull: false},
    status:{type: DataTypes.STRING,allowNull: false},
    waktuPesan:{type: DataTypes.DATE,allowNull: false},
    alamat:{type: DataTypes.STRING,allowNull: false}
},{freezeTableName: true});

const DetailPesanan = db.define('detailPesanan',{
    idPesanan:{type: DataTypes.STRING,allowNull: false},
    idProduk:{type: DataTypes.STRING,allowNull: false},
    jumlah:{type: DataTypes.INTEGER,allowNull: false},
    harga:{type: DataTypes.DOUBLE,allowNull: false},
},{freezeTableName: true});

 
//models
export const getAllPesanan = async (req, res) => {
  try {
      const products = await Pesanan.findAll();
      for(const data in products){
        products[data].dataValues.waktuPesan = convertTimestamp(products[data].dataValues.waktuPesan);
      }
      res.json(products);
  } catch (error) {
      res.json({ message: error.message });
  }  
}


export const getPesananById = async (req, res) => {
    try {
      const query = (await query_select(`SELECT pesanan.idPesanan, detailAkun.nama, pesanan.alamat, detailAkun.email, detailAkun.noTelp, pesanan.waktuPesan, detailPesanan.idProduk, produk.nama as namaProduk, detailPesanan.harga, detailPesanan.jumlah FROM detailpesanan, pesanan, detailAkun, produk WHERE pesanan.idPesanan = detailpesanan.idPesanan and pesanan.idAkun = detailAkun.idAkun AND detailPesanan.idProduk = produk.idProduk AND pesanan.idPesanan = '${req.body.idPesanan}';`));

      // console.log(query);

      let result = []
      const pesanan = query.reduce((acc, detailPesanan) => {
        detailPesanan.waktuPesan = convertTimestamp(detailPesanan.waktuPesan);
        result.push(detailPesanan);
        return acc = result
      }, {});

      console.log(pesanan);



      res.json(pesanan);
    } catch (error) {
      console.log(error);
        res.json({ message: error.message });
    }  
}


  

export const createPesanan = async (req, res) => {
    try {
        const currentIdPesanan = (await query_select("SELECT idPesanan FROM pesanan ORDER BY idPesanan DESC LIMIT 1"))[0];
        const GENERATED_ID_PESANAN = generateIdPesanan(currentIdPesanan == undefined ? "PAA0000000" : currentIdPesanan.idPesanan);
        await Pesanan.create({
            idPesanan: GENERATED_ID_PESANAN,
            idAkun: req.body[0].idAkun,
            total: req.body[0].total,
            status: "Sudah Bayar",
            waktuPesan: new Date(),
            alamat: (await query_select(`SELECT alamat FROM detailAkun WHERE idAkun="${req.body[0].idAkun}" LIMIT 1`))[0].alamat
        });
        for(let data in req.body){

            await DetailPesanan.create({
                idPesanan: GENERATED_ID_PESANAN,
                idProduk: req.body[data].idProduk,
                jumlah: req.body[data].jumlah,
                harga:  req.body[data].harga
             });
        }
        res.json({
            message: 'Pesanan Berhasil Dibuat!',
            status: true,
        });
    } catch (error) {
        res.json({
            message: error.message,
            status: false,
    });
  }
};
