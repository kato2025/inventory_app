// Create vaiables for express and router
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you're using pg for PostgreSQL

// GET / (Home route)
router.get('/', async (req, res) => {
    try {
        // Query to get all categories
        const categoriesResult = await pool.query('SELECT * FROM categories');
        const categories = categoriesResult.rows;

        // Loop through each category to get its items
        for (let category of categories) {
            const itemsResult = await pool.query('SELECT * FROM items WHERE category_id = $1', [category.id]);
            category.items = itemsResult.rows;  // Add items to the category object
        }

        // Render home.ejs with the categories and items data
        res.render('home', { categories });
    } catch (err) {
        console.error('Error fetching categories and items:', err);
        res.status(500).send('Server error');
    }
});

// Export the router
module.exports = router;
