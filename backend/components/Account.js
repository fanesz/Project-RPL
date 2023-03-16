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

//models

export const getAllEmail = async (req, res) => {
    try {
        const Email = await Account.findAll({
            attributes: ['email']
        });
        res.json(Email);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createAccount = async (req, res) => {
    try {
        await Account.create(req.body);
        res.json({
            "message": "Account Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

