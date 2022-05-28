import connection from "../db.js";

export const getGames = async (req, res) => {
    const { name } = req.query;
    let query = `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id`;
    if (name) {
        query += " WHERE games.name ILIKE '" + name + "%'";
    }
    const { rows } = await connection.query(query);
    res.json(rows);
}

export const createGame = async (req, res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
    res.sendStatus(201)
}