import connection from "../db.js";
import moment from "moment";

export const checkIfCpfExists = async (req, res, next) => {
    const { cpf } = req.body;
    const { rows } = await connection.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);
    if(rows.length > 0) {
        return res.sendStatus(409);
    }
    next();
}

export const checkIfCpfExistsOnUpdate = async (req, res, next) => {
    const { id } = req.params;
    const { cpf } = req.body;
    const { rows } = await connection.query("SELECT * FROM customers WHERE cpf = $1 AND id != $2", [cpf, id]);
    if(rows.length > 0) {
        return res.sendStatus(409);
    }
    next();
}

export const checkIfCpfIsValid = async (req, res, next) => {
    const { cpf } = req.body;
    const regex = /^\d{11}$/;
    if(!regex.test(cpf)) {
        return res.sendStatus(400);
    }
    next();
}

export const checkIfPhoneIsValid = async (req, res, next) => {
    const { phone } = req.body;
    const regex = /^\d{10,11}$/;
    if(!regex.test(phone)) {
        return res.sendStatus(400);
    }
    next();
}

export const checkIfBirthdayIsValid = async (req, res, next) => {
    const { birthday } = req.body;
    if(!moment(birthday, "YYYY-MM-DD", true).isValid()) {
        return res.sendStatus(400);
    }
    next();
}