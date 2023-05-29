import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateVerificationCode } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
const { DataTypes } = Sequelize;
 
const Account = db.define('account',{
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    changepwCode:{
        type: DataTypes.STRING
    }

},{
    freezeTableName: true
});

//models

export const getAllUserAccount = async (req, res) => {
    try {
        const userAccount = await Account.findAll({
            attributes: ['email', 'password', 'changepwCode']
        });
        res.json(userAccount);
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

export const loginAccount = async (req, res) => {
    try {
        const userPassword = await Account.findAll({
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
        const code = await Account.findAll({
            attributes: ['email', 'changepwCode'],
            where: { email: req.body.email }
        });


        if(code.length == 0){
            res.json({
                "message": "Email not terdaftar!",
                "result": false
            });
        } else if(code[0].dataValues.changepwCode != null) {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, changepwCode);
            await Account.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                "message": "Link verifikasi baru sudah terkirim!",
                "result": false
            });
        } else {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, changepwCode);
            await Account.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                "message": "Link ganti password terkirim!",
                "result": true
            });
        }
    } catch (error) {
        res.json({
            "message": "Error Occured!",
            "result": false
        });
    }  
}

export const changePasswordPage = async (req, res) => {
    try {
        const result = await Account.findAll({
            where: {
                id: req.params.id
            }
        });
        if (result != null){
            res.json({
                "message": "Verification Link Detected!",
                "result": true,
                "email": result[0].dataValues.email
            });
        }

    } catch (error) {
        res.json({
            "message": "Error Occured!",
            "result": false
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        console.log(req);
        const result = await Account.update(
            { password: req.body.newPassword,
              changepwCode: null },
            { where: { changepwCode: req.body.id } }
        );
        if (result != null){
            res.json({
                "message": "Password Changed!",
                "result": true
            });
        } else {
            res.json({
                "message": "Link Expired!",
                "result": false
            });
        }

    } catch (error) {
        res.json({
            "message": "Error Occured!",
            "result": false
        });
    }
}