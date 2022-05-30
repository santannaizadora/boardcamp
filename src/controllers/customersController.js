import connection from "../db.js";

export const getCustomers = async (req, res) => {
    const {cpf} = req.query;
    let query = "SELECT * FROM customers";
    if (cpf) {
        query += " WHERE cpf ILIKE '" + cpf + "%'";
    }
    const { rows } = await connection.query(query);
    res.json(rows);
}

export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    const { rows } = await connection.query("SELECT * FROM customers WHERE id = $1", [id]);
    if(rows.length === 0) {
        res.sendStatus(404);
    }
    res.json(rows[0]);
}

export const createCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
    res.sendStatus(201);
}

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id]);
    res.sendStatus(200);
}
