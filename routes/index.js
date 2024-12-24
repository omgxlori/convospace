const router = require('express').Router();
const apiRoutes = require('./api');

// Add the `/api` prefix to all API routes
router.use('/api', apiRoutes);

// 404 error handler for undefined routes
router.use((req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
