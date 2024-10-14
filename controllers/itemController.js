// Create variables for express and router
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you export your pool from db.js

// Get all items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.render('items/index', {
      items: result.rows,
      title: 'Items',
      layout: 'layout',
      activeTab: req.activeTab  // Pass activeTab to the view
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Server Error');
  }
});

// Get new item form
router.get('/new', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.render('items/new', {
      categories: categories.rows,
      title: 'Add New Item',
      layout: 'layout',
      activeTab: req.activeTab // Pass activeTab to the view
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server Error');
  }
});

// Get edit item form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;

  try {
    const itemResult = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    const categoriesResult = await pool.query('SELECT * FROM categories');

    if (itemResult.rows.length === 0) {
      return res.status(404).send('Item not found');
    }

    const item = itemResult.rows[0];
    const categories = categoriesResult.rows;

    res.render('items/edit', {
      item,
      categories,
      title: 'Edit Item',
      layout: 'layout',
      activeTab: req.activeTab // Pass activeTab to the view
    });
  } catch (error) {
    console.error('Error fetching item or categories for edit:', error);
    res.status(500).send('Server Error');
  }
});

// Create new item
router.post('/', async (req, res) => {
  const { name, quantity, price, description, categoryid } = req.body;

  try {
    await pool.query(
      'INSERT INTO items (name, quantity, price, description, categoryid) VALUES ($1, $2, $3, $4, $5)',
      [name, quantity, price, description, categoryid]
    );
    res.redirect('/items');
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).send('Server Error');
  }
});

// Update item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, categoryid, price } = req.body;

  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2, categoryid = $3, price = $4 WHERE id = $5',
      [name, description, categoryid, price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send('Item not found');
    }

    res.redirect('/items');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Server Error');
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.redirect('/items');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Server Error');
  }
});

// Export the router
module.exports = router;
