const express = require('express');
const schoolController = require('../controllers/schoolController');
const router = express.Router();

// School routes
router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;