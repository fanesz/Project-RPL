import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImage, deleteImage, generateIdPesanan, convertTimestamp } from "../utils/utils.js";
import fs from "fs";
import { query_select } from "../utils/query.js";
const { DataTypes } = Sequelize;

 
const Rekening = db.define('rekening',{
  idRekening:{type: DataTypes.STRING,allowNull: false},
  bank:{type: DataTypes.STRING,allowNull: false},
  nama:{type: DataTypes.STRING,allowNull: false},
  nomor:{type: DataTypes.STRING,allowNull: false},
},{freezeTableName: true});

 
//models
export const getAllRekening = async (req, res) => {
  try {
    const rekening = await Rekening.findAll();
    res.json(rekening);
  } catch (error) {
    res.json({ message: error.message });
  }  
}


export const getRekeningById = async (req, res) => {
  try {
    const rekening = await Rekening.findAll({
      where: { idRekening: req.params.id }
    });
    res.json(rekening);
  } catch (error) {
    res.json({ message: error.message });
  }  
}


