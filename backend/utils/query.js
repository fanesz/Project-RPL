import { Sequelize } from "sequelize";
import db from "../config/database.js";

const query_select = async(sql) => {
    let res;
    await db.query(sql, { type: Sequelize.QueryTypes.CALL })
    .then((results) => {
        res = results[0]
    })
    .catch((error) => {
        res = false;
    });
    return res;
}

const query_call = async(sql) => {
    let res;
    await db.query(sql, { type: Sequelize.QueryTypes.CALL })
    .then((results) => {
        res = true;
    })
    .catch((error) => {
        res = false;
    });
    return res;
}




export { query_select, query_call }

