import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateUUID } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
import { query_call } from "../utils/query.js";
const { DataTypes } = Sequelize;
 
const DetailAkun = db.define('detailAkun',{
    // id:{
    //     type: DataTypes.INT,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false
    // },
    idAkun:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    nama:{
        type: DataTypes.STRING,
    },
    jabatan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    noTelp:{
        type: DataTypes.STRING,
    },
    alamat:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
});

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

export const updateDetailAkun = async (req, res) => {
    try {
        await DetailAkun.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Detail Account Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteDetailAkun = async (req, res) => {
    try {
        await DetailAkun.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Detail Account Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
