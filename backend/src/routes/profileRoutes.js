const express = require('express');
const { completeRegistration } = require('../controllers/profileController');

const router = express.Router();

router.post('/complete', completeRegistration);

module.exports = router;
