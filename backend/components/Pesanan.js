import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImage, deleteImage, generateIdPesanan, convertTimestamp } from "../utils/utils.js";
import fs from "fs";
import { query_select } from "../utils/query.js";
import sendMail from "../config/mailer.js";
const { DataTypes } = Sequelize;

 
const Pesanan = db.define('pesanan',{
    idPesanan:{type: DataTypes.STRING,allowNull: false},
    idAkun:{type: DataTypes.STRING,allowNull: false},
    jumlahJenisBarang:{type: DataTypes.INTEGER,allowNull: false},
    total:{type: DataTypes.DOUBLE,allowNull: false},
    status:{type: DataTypes.STRING,allowNull: false},
    waktuPesan:{type: DataTypes.DATE,allowNull: false},
    idRekening:{type: DataTypes.STRING,allowNull: false},
    atasNama:{type: DataTypes.STRING,allowNull: false},
    alamat:{type: DataTypes.JSON,allowNull: false}
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
      let query;
      if(req.params.id.length === 36){
        query = (await query_select(`SELECT pesanan.idPesanan, detailAkun.nama, pesanan.alamat, detailAkun.email, detailAkun.noTelp, pesanan.waktuPesan, pesanan.status, detailPesanan.idProduk, produk.nama as namaProduk, detailPesanan.harga, detailPesanan.jumlah, pesanan.jumlahJenisBarang, rekening.bank, pesanan.atasNama, pesanan.total FROM detailpesanan, pesanan, detailAkun, produk, rekening WHERE pesanan.idPesanan = detailpesanan.idPesanan and pesanan.idAkun = detailAkun.idAkun AND pesanan.idRekening = rekening.idRekening AND detailPesanan.idProduk = produk.idProduk AND pesanan.idAkun = '${req.params.id}';`));
      } else if(req.params.id.length === 10){
        query = (await query_select(`SELECT pesanan.idPesanan, detailAkun.nama, pesanan.alamat, detailAkun.email, detailAkun.noTelp, pesanan.waktuPesan, pesanan.status, detailPesanan.idProduk, produk.nama as namaProduk, detailPesanan.harga, detailPesanan.jumlah, pesanan.jumlahJenisBarang, rekening.bank, pesanan.atasNama, pesanan.total FROM detailpesanan, pesanan, detailAkun, produk, rekening WHERE pesanan.idPesanan = detailpesanan.idPesanan and pesanan.idAkun = detailAkun.idAkun AND pesanan.idRekening = rekening.idRekening AND detailPesanan.idProduk = produk.idProduk AND pesanan.idPesanan = '${req.params.id}';`));
      }
      for(let key in query){
        query[key]["gambar"] = null
        try {
          const imagePath = `./gambar/${query[key].idProduk}.png`;
          const readFilePromise = new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
              if (err) {
                return reject('Image not found');
              }
              const imageBase64 = data.toString('base64');
              const imageData = `data:image/jpeg;base64,${imageBase64}`;
              query[key]["gambar"] = imageData;
              resolve();
            });
          });
          await readFilePromise;
        } catch (error) {
        }
      }
      let result = []
      const pesanan = query.reduce((acc, detailPesanan) => {
        detailPesanan.waktuPesan = convertTimestamp(detailPesanan.waktuPesan);
        result.push(detailPesanan);
        return acc = result
      }, {});

      res.json(pesanan);
    } catch (error) {
      res.json({ message: error.message });
    }  
}

export const createPesanan = async (req, res) => {
    try {
      const currentIdPesanan = (await query_select("SELECT idPesanan FROM pesanan ORDER BY idPesanan DESC LIMIT 1"))[0];
      const GENERATED_ID_PESANAN = generateIdPesanan(currentIdPesanan == undefined ? "PAA0000000" : currentIdPesanan.idPesanan);
      for(let data in req.body){
        if(!(await query_select(`SELECT stok FROM produk WHERE idProduk='${req.body[data].idProduk}'`))[0].stok >= req.body[data].jumlah){
          res.json({message:"Ada produk yang stoknya kurang!", status: false})
          return;
        }
      }

      const getAlamat = [(await query_select(`SELECT * FROM alamat WHERE idAkun="${req.body[0].idAkun}" LIMIT 1`))[0]]
      const getEmail = (await query_select(`SELECT email FROM akun WHERE idAkun="${req.body[0].idAkun}"`))[0].email

      await Pesanan.create({
        idPesanan: GENERATED_ID_PESANAN,
        idAkun: req.body[0].idAkun,
        jumlahJenisBarang: Object.keys(req.body).length,
        total: req.body[0].total,
        status: "Sudah Bayar",
        waktuPesan: new Date(),
        idRekening: req.body[0].idRekening,
        atasNama: req.body[0].atasNama,
        alamat: getAlamat
      });

      for(let data in req.body){
        await DetailPesanan.create({
          idPesanan: GENERATED_ID_PESANAN,
          idProduk: req.body[data].idProduk,
          jumlah: req.body[data].jumlah,
          harga:  req.body[data].harga
          });
      }
      sendMail(getEmail, [GENERATED_ID_PESANAN, req.body], 'pesanan');

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

export const changeStatusPesanan = async (req, res) => {
  try {
    await Pesanan.update({
      status: req.body.status
    }, {
      where: {
        idPesanan: req.body.idPesanan
      }
    });
    res.json({
        message: 'Status berhasil diubah!',
        status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
  });
}
};

