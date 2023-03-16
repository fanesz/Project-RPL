import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Account = db.define('account',{
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },

},{
    freezeTableName: true
});
 
export default Account;