// index.js

const express = require('express');
const router = express.Router();

const viewRoutes = require('./viewRoutes');
const addRoutes = require('./addRoutes');
const updateRoutes = require('./updateRoutes');

router.use('/view', viewRoutes);
router.use('/add', addRoutes);
router.use('/update', updateRoutes);

module.exports = router;
