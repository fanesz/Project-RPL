import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateVerificationCode } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
import { generateUUID } from "../utils/utils.js";
const { DataTypes } = Sequelize;
 
const Akun = db.define('akun',{
    // id:{
    //     type: DataTypes.INT,
    //     autoIncrement: true,
    //     allowNull: false
    // },
    idAkun:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    changepwCode:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

//models

export const getAllUserAccount = async (req, res) => {
    try {
        const userAccount = await Akun.findAll({
            attributes: ['id', 'idAkun', 'email', 'password', 'changepwCode']
        });
        res.json(userAccount);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createAccount = async (req, res) => {
    try {
        
        await Akun.create({
            email: res.data.email,
            password: res.data.password,
        });
        res.json({
            "message": "Account Created",
            "status": 400
        });
    } catch (error) {
        res.json({ message: error.message, status: 400 });
    }
}

export const loginAccount = async (req, res) => {
    try {
        const userPassword = await Akun.findAll({
            attributes: ['password'],
            where: {
                email: req.body.email
            }
        });
        if(userPassword.length == 0) {
            res.json({
                "message": "Failed Login, Wrong Email!",
                "result": false
            })
        } else if(userPassword[0].dataValues.password == req.body.password){
            res.json({
                "message": "Successful Login",
                "result": true
            })
        } else {
            res.json({
                "message": "Failed Login, Wrong Password!",
                "result": false
            })
        }

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const sendVerificationCode = async (req, res) => {
    try {
        const code = await Akun.findAll({
            attributes: ['email', 'changepwCode'],
            where: { email: req.body.email }
        });


        if(code.length == 0){
            res.json({
                message: "Email not terdaftar!",
                status: false
            });
        } else if(code[0].dataValues.changepwCode != null) {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, changepwCode);
            await Akun.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                message: "Link verifikasi baru sudah terkirim!",
                status: false
            });
        } else {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, changepwCode);
            await Akun.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                message: "Link ganti password terkirim!",
                status: true
            });
        }
    } catch (error) {
        // console.log(error);
        res.json({
            message: "Error Occured!",
            status: false
        });
    }  
}

export const changePasswordPage = async (req, res) => {
    try {
        const result = await Akun.findAll({
            where: {
                changepwCode: req.params.id
            }
        });
        if (result.length != 0){
            res.json({
                message: "Verification Link Detected!",
                status: true,
            });
        }else {
            res.json({
                message: "Wrong Verification Link!",
                status: false,
            });
        }

    } catch (error) {
        res.json({
            message: "Not Found!",
            status: false
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        console.log(req);
        const result = await Akun.update(
            { password: req.body.newPassword,
              changepwCode: null },
            { where: { changepwCode: req.body.id } }
        );
        if (result != null){
            res.json({
                message: "Password Changed!",
                status: true
            });
        } else {
            res.json({
                message: "Link Expired!",
                status: false
            });
        }

    } catch (error) {
        console.log(error);
        res.json({
            message: "Error Occured!",
            status: false
        });
    }
}