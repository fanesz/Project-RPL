import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateUUID } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
import { query_call, query_select } from "../utils/query.js";
const { DataTypes } = Sequelize;
 
const DetailAkun = db.define('detailAkun',{
    idAkun:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,allowNull: false},
    nama:{type: DataTypes.STRING,},
    jabatan:{type: DataTypes.STRING,allowNull: false},
    noTelp:{type: DataTypes.STRING,},
    alamat:{type: DataTypes.STRING,},
    email:{type: DataTypes.STRING,allowNull: false}
},{freezeTableName: true});

const Alamat = db.define('alamat',{
    idAkun:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,allowNull: false},
    jalan:{type: DataTypes.STRING},
    jalan:{type: DataTypes.STRING},
    kodePos:{type: DataTypes.STRING},
    rtrw:{type: DataTypes.STRING},
    provinsi:{type: DataTypes.STRING},
    kota:{type: DataTypes.STRING},
    kecamatan:{type: DataTypes.STRING},
    kelurahan:{type: DataTypes.STRING},
},{freezeTableName: true});



//models

export const getAllDetailAkun = async (req, res) => {
    try {
        const cekDetailAkun = await DetailAkun.findAll({
            attributes: ['id','idAkun','nama','jabatan','noTelp','alamat','email']
        });
        res.json(cekDetailAkun);
    } catch (error) {
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

export const getAllDetailAkunByIdAkun = async (req, res) => {
  try {
      const detailAkun = await DetailAkun.findAll({
        where: { idAkun: req.body.idAkun }
      });
      res.json(detailAkun);
  } catch (error) {
      res.json({ message: error.message });
  }
}

export const getAlamatById = async (req, res) => {
    try {
        const alamat = await Alamat.findAll({
            where : { idAkun: req.body.idAkun }
        });
        res.json(alamat);
    } catch (error) {
        res.json({ message: error.message });
    }
}
export const updateAlamat = async (req, res) => {
    try {
        console.log(
            (await query_select(`SELECT * FROM ALAMAT WHERE idAkun='${req.body.idAkun}'`))
        );

        await Alamat.update(req.body.datas, {
            where: { idAkun: req.body.idAkun }
        });
          
        res.json({message: "Alamat Added!", status: true});
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
}