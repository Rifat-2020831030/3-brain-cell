const express = require('express');
const { completeRegistration } = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/complete', verifyToken, completeRegistration);

module.exports = router;
