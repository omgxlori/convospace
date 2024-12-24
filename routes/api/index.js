const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Add the `/users` and `/thoughts` prefixes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
