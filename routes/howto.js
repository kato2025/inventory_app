// Create vaiables for express and router
const express = require('express');
const router = express.Router();

// GET /howto (renders hoot.ejs)
router.get('/', (req, res) => {
    res.render('howto', { activeTab: 'howto' });  // Render howto.ejs with activeTab
});

// Export the router
module.exports = router;
