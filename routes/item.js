// Create vaiables for express and router
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to get all items
router.get('/', (req, res) => {
  itemController.getAllItems(req, res, req.activeTab);
});

// Route to get a specific item by ID
router.get('/:id', (req, res) => {
  itemController.getItemById(req, res, req.activeTab);
});

// Route to create a new item
router.post('/', (req, res) => {
  itemController.createItem(req, res, req.activeTab);
});

// Route to update an item by ID
router.put('/:id', (req, res) => {
  itemController.updateItem(req, res, req.activeTab);
});

// Route to delete an item by ID
router.delete('/:id', (req, res) => {
  itemController.deleteItem(req, res, req.activeTab);
});

// Export the router
module.exports = router;
 