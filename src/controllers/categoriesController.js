import connection from "../db.js";

export const getCategories = async (req, res) => {
    const { rows } = await connection.query("SELECT * FROM categories");
    res.json(rows);
}


export const createCategory = async (req, res) => {
    const { name } = req.body;
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.sendStatus(201)
}
