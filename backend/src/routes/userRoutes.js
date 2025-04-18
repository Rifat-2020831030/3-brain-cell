const express = require('express');
const router = express.Router();
const { checkVerificationStatus, getOngoingDisasters } = require('../controllers/userController');
const { generalLimiter } = require('../utils/rateLimiter');

router.use(generalLimiter);


router.get('/:userId/verify', checkVerificationStatus);
router.get('/disasters', getOngoingDisasters);
module.exports = router;
