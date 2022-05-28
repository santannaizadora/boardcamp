import connection from "../db.js";

export const checkIfCategoryExists = async (req, res, next) => {
    const { categoryId } = req.body;
    const { rows } = await connection.query("SELECT * FROM categories WHERE id = $1", [categoryId]);
    if (rows.length === 0) {
        return res.status(409).json({
            error: "Category does not exist"
        });
    }
    next();
}

export const checkIfGameNameExists = async (req, res, next) => {
    const { name } = req.body;
    const { rows } = await connection.query("SELECT * FROM games WHERE name = $1", [name]);
    if (rows.length > 0) {
        return res.status(409).json({
            error: "Game already exists"
        });
    }
    next();
}

export const checkIfAreValidData = async (req, res, next) => {
    const { name, image, stockTotal, pricePerDay } = req.body;
    if (name === "" || name === undefined) {
        return res.status(400).json({
            error: "Game name cannot be empty"
        });
    }
    if (image === "" || image === undefined) {
        return res.status(400).json({
            error: "Game image cannot be empty"
        });
    }
    if (stockTotal < 1 || stockTotal === undefined) {
        return res.status(400).json({
            error: "Game stock cannot be less than 1"
        });
    }
    if (pricePerDay < 1 || pricePerDay === undefined) {
        return res.status(400).json({
            error: "Game price cannot be less than 1"
        });
    }
    next();
}
