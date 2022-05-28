import connection from "../db.js";

export const checkIfCategoryExists = async (req, res, next) => {
    const { name } = req.body;
    const { rows } = await connection.query("SELECT * FROM categories WHERE name = $1", [name]);
    if (rows.length > 0) {
        return res.status(409).json({
            error: "Category already exists"
        });
    }
    next();
}

export const checkIfThereIsCategoryName = async (req, res, next) => {
    const { name } = req.body;
    if (name === "" || name === undefined) {
        return res.status(400).json({
            error: "Category name cannot be empty"
        });
    }
    next();
}