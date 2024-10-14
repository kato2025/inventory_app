// Create vaiables for express and router
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories (pass activeTab for navigation)
router.get('/', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryController.getAllCategories);

// Get a specific category by ID
router.get('/:id', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryController.getCategoryById);

// Create a new category
router.post('/', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryController.createCategory);

// Update a category by ID
router.put('/:id', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryController.deleteCategory);

// Export the router
module.exports = router;
