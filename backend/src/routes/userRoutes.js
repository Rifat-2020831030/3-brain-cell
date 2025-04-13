const express = require('express');
const router = express.Router();
const { checkVerificationStatus } = require('../controllers/userController');
const { generalLimiter } = require('../utils/rateLimiter');

router.use(generalLimiter);


router.get('/:userId/verify', checkVerificationStatus);

module.exports = router;
