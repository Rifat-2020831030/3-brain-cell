const express = require('express');
const router = express.Router();
const { checkVerificationStatus, fetchOngoingDisasters } = require('../controllers/userController');
const { generalLimiter } = require('../utils/rateLimiter');

router.use(generalLimiter);


router.get('/:userId/verify', checkVerificationStatus);
router.get('/disasters', fetchOngoingDisasters);
module.exports = router;
