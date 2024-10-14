require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const { Parser } = require('json2csv'); // Library to convert JSON to CSV

const homeRoutes = require('./routes/home');
const categoryRoutes = require('./controllers/categoryController');
const itemRoutes = require('./controllers/itemController');
const aboutRoutes = require('./routes/about');
const howtoRoutes = require('./routes/howto');

const app = express();

// Database setup
const pool = require('./db'); // Import the database connection from connection.js

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route (pass activeTab: 'home')
app.get('/', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    
    const categoryItems = await Promise.all(categories.rows.map(async (category) => {
      const items = await pool.query('SELECT * FROM items WHERE categoryid = $1', [category.id]);
      return { ...category, items: items.rows };
    }));

    res.render('home', { categories: categoryItems, activeTab: 'home' });
  } catch (error) {
    console.error('Error fetching categories and items:', error);
    res.status(500).send('Server Error');
  }
});

// Use routes (pass activeTab accordingly)
app.use('/', homeRoutes);
app.use('/categories', (req, res, next) => {
  req.activeTab = 'categories'; // Set activeTab for categories
  next();
}, categoryRoutes);

app.use('/items', (req, res, next) => {
  req.activeTab = 'items'; // Set activeTab for items
  next();
}, itemRoutes);

app.use('/about', (req, res, next) => {
  req.activeTab = 'about'; // Set activeTab for about
  next();
}, aboutRoutes);

app.use('/howto', (req, res, next) => {
  req.activeTab = 'howto'; // Set activeTab for howto
  next();
}, howtoRoutes);

// Route to export categories and items as CSV
app.get('/export-csv', async (req, res) => {
  try {
    // Query to fetch categories and their items
    const categories = await pool.query('SELECT * FROM categories');
    const categoryItems = await Promise.all(categories.rows.map(async (category) => {
      const items = await pool.query('SELECT * FROM items WHERE categoryid = $1', [category.id]);
      return { ...category, items: items.rows };
    }));

    // Flatten the data into a single array for CSV conversion
    const csvData = [];
    categoryItems.forEach(category => {
      if (category.items && category.items.length > 0) {
        category.items.forEach(item => {
          csvData.push({
            Category: category.name,
            Item: item.name,
            Description: item.description,
            Quantity: item.quantity,
            Price: item.price
          });
        });
      } else {
        csvData.push({
          Category: category.name,
          Item: 'No items',
          Description: '',
          Quantity: '',
          Price: ''
        });
      }
    });

    // Convert JSON data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    // Get the current date and time for the filename
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
    const filename = `Inventory-${formattedDate}-${formattedTime}.csv`;

    // Send the CSV file for download, prompting the user to save it wherever they want
    res.attachment(filename);
    res.send(csv);

  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
