// Create vaiables for express and router
const express = require('express');
const router = express.Router();

// GET /about
router.get('/', (req, res) => {
    // Render the about.ejs view and pass the activeTab to highlight the navigation
    res.render('about', { activeTab: 'about' });
});

// Export the router
module.exports = router;
