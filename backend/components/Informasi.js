import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { saveImage, deleteImage, generateIdPesanan, convertTimestamp } from "../utils/utils.js";
import fs from "fs";
import { query_call, query_select } from "../utils/query.js";
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

export const CheckTablesExistence = async (req, res) => {
  try {
    const result = await query_select(`
    SELECT 'detailAkun' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'detailAkun') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'alamat' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'alamat') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'akun' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'akun') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'produk' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'produk') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'rekening' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'rekening') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'pesanan' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pesanan') THEN 'true' ELSE 'false' END AS Status UNION ALL
    SELECT 'detailPesanan' AS TableName, CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'detailPesanan') THEN 'true' ELSE 'false' END AS Status;`)
    console.log(result);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }  
}
