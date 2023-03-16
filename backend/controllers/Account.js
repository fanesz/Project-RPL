import Account from "../models/accountModel.js";

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

