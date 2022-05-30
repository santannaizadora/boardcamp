import connection from "../db.js";

export const checkIfCustomerExists = async (req, res, next) => {
    const { customerId } = req.body;
    const { rows } = await connection.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
    if (rows.length === 0) {
        return res.sendStatus(404);
    }
    next();
}

export const checkIfGameExists = async (req, res, next) => {
    const { gameId } = req.body;
    const { rows } = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    if (rows.length === 0) {
        return res.sendStatus(404);
    }
    next();
}

export const checkIfRentalDaysIsValid = async (req, res, next) => {
    const { daysRented } = req.body;
    if (daysRented < 1 || daysRented === null) {
        return res.sendStatus(400);
    }
    next();
}

export const checkIfStockIsAvailable = async (req, res, next) => {
    const { gameId } = req.body;
    const stock = await connection.query(`SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]);
    const gamesRented = await connection.query(`SELECT COUNT(*) FROM rentals WHERE "gameId" = $1`, [gameId]);
    if (stock.rows[0].stockTotal - gamesRented.rows[0].count < 1) {
        return res.sendStatus(400);
    }
    next();
}

export const checkIfRentalIsFinnished = async (req, res, next) => {
    const { id } = req.params;
    const { rows } = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    if (rows[0].returnDate !== null) {
        return res.sendStatus(400);
    }
    next();
}

export const checkIfRentalExists = async (req, res, next) => {
    const { id } = req.params;
    const { rows } = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    if (rows.length === 0) {
        return res.sendStatus(404);
    }
    next();
}