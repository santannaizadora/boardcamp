import connection from "../db.js";

export const getRentals = async (req, res) => {
    const { customerId, gameId } = req.query;
    let query = ` SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" 
        FROM rentals 
        JOIN customers ON customers.id = rentals."customerId" 
        JOIN games ON games.id = rentals."gameId" 
        JOIN categories ON games."categoryId" = categories.id`;
    if (customerId) {
        query += ` WHERE "customerId" = ` + customerId;
    }
    if (gameId) {
        query += ` WHERE "gameId" = ` + gameId;
    }

    const rentalsList = await connection.query(query)
    let rentals = rentalsList.rows;

    const sendRentals = [];
    for (let rental of rentals) {
        rental = {
            ...rental,
            customer: {
                id: rental.customerId,
                name: rental.customerName
            },
            game: {
                id: rental.gameId,
                name: rental.gameName,
                categoryId: rental.categoryId,
                categoryName: rental.categoryName
            }
        }
        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
        sendRentals.push(rental);
    }

    res.json(sendRentals);

}

export const createRental = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = new Date();
    const price = await connection.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [gameId]);
    const originalPrice = price.rows[0].pricePerDay * daysRented;
    const { rows } = await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)`, [customerId, gameId, rentDate, daysRented, originalPrice]);
    res.sendStatus(201);
}

export const finnishRental = async (req, res) => {
    const { id } = req.params;

    const today = new Date();
    const { rows } = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    const game = await connection.query(`SELECT * FROM games WHERE id = $1`, [rows[0].gameId]);
    const rental = rows[0];
    const days= today.getDate() - rental.rentDate.getDate();

    let delayFee = 0;
    if(days > rental.daysRented){
        delayFee = days * game.rows[0].pricePerDay;
    }

    const { rows: updateRental } = await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [today, delayFee, id]);
    res.sendStatus(200);
}

export const deleteRental = async (req, res) => {
    const { id } = req.params;
    const { rows } = await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    res.sendStatus(200);
}