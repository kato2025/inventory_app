// Create variables for express and router
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.render('categories/index', {
      categories: result.rows,
      error: null,
      activeTab: 'categories' // Passing active tab for navigation
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server Error');
  }
});

// Get new category form
router.get('/new', (req, res) => {
  res.render('categories/new', {
    title: 'Add New Category',
    activeTab: 'categories' // Passing active tab for navigation
  });
});

// Create new category
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send('Server Error');
  }
});

// Edit category form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    res.render('categories/edit', {
      category: result.rows[0],
      title: 'Edit Category',
      activeTab: 'categories' // Passing active tab for navigation
    });
  } catch (error) {
    console.error('Error fetching category for edit:', error);
    res.status(500).send('Server Error');
  }
});

// Update category (use PUT instead of POST for update operations)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await pool.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3', [name, description, id]);
    res.redirect('/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Server Error');
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the category has items
    const items = await pool.query('SELECT * FROM items WHERE categoryid = $1', [id]);

    if (items.rowCount > 0) {
      // Category has items, don't allow deletion
      const allCategories = await pool.query('SELECT * FROM categories');
      return res.render('categories/index', {
        categories: allCategories.rows,
        error: 'Cannot delete this category. It has items associated with it. Please delete all items first.',
        activeTab: 'categories' // Ensure activeTab is still passed here
      });
    } else {
      // No items associated with this category, proceed with deletion
      await pool.query('DELETE FROM categories WHERE id = $1', [id]);
      res.redirect('/categories');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Server Error');
  }
});

// Show single category with items
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the category
    const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    
    // Fetch the items related to this category
    const itemsResult = await pool.query('SELECT * FROM items WHERE categoryid = $1', [id]);

    // Render the category page with the items
    res.render('categories/show', {
      category: categoryResult.rows[0],
      items: itemsResult.rows,
      activeTab: 'categories' // Ensure the correct tab remains active
    });
  } catch (error) {
    console.error('Error fetching category and items:', error);
    res.status(500).send('Server Error');
  }
});

// Export the router
module.exports = router;
