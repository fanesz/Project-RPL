import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateUUID } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
import { query_call, query_select } from "../utils/query.js";
const { DataTypes } = Sequelize;
 
const DetailAkun = db.define('detailAkun',{
    idAkun:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,allowNull: false},
    nama:{type: DataTypes.STRING,},
    noTelp:{type: DataTypes.STRING,},
    email:{type: DataTypes.STRING,allowNull: false}
},{freezeTableName: true});

const Alamat = db.define('alamat',{
    idAkun:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,allowNull: false},
    jalan:{type: DataTypes.STRING},
    jalan:{type: DataTypes.STRING},
    penerima:{type: DataTypes.STRING},
    noTelp:{type: DataTypes.STRING},
    kodePos:{type: DataTypes.STRING},
    rtrw:{type: DataTypes.STRING},
    provinsi:{type: DataTypes.STRING},
    kota:{type: DataTypes.STRING},
    kecamatan:{type: DataTypes.STRING},
    kelurahan:{type: DataTypes.STRING},
},{freezeTableName: true});



//models

export const getDetailAkunById = async (req, res) => {
    try {
        const detailAkun = await DetailAkun.findAll({
          where : { idAkun: req.params.id }
        });
        res.json(detailAkun);
    } catch (error) {
      console.log(error);
        res.json({ message: error.message });
    }
}

export const createDetailAkun = async (req, res) => {
    try {
        let query = await query_call(`call tambahAkun("${req.body.email}", "${req.body.password}", "pelanggan")`)
        res.json({
            message: query ? "Account Created!" : "Email Already Registered!",
            status: true
        });
    } catch (error) {
        res.json({ message: error.message, "status": false });
    }
}

export const updateDetailAkun = async (req, res) => {
  try {
      await DetailAkun.update(req.body, {
          where: { idAkun: req.body.idAkun }
      });
      res.json({message: "Detail Akun Updated!", status: true});
  } catch (error) {
    console.log(error);
      res.json({ message: error.message, status: false });
  }
}



// alamat

export const getAlamatById = async (req, res) => {
    try {
        const alamat = await Alamat.findAll({
            where : { idAkun: req.params.id }
        });
        res.json(alamat);
    } catch (error) {
      console.log(error);
      res.json({ message: error.message });
    }
}

export const updateAlamat = async (req, res) => {
    try {
        let update = await Alamat.update(req.body.datas, {
          where: { idAkun: req.body.idAkun }
        });
        console.log(update);
        res.json({message: "Alamat Updated!", status: true});
    } catch (error) {
      console.log(error);
      res.json({ message: error.message, status: false });
    }
}