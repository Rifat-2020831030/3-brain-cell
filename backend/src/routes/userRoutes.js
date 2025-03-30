const express = require('express');
const router = express.Router();
const { checkVerificationStatus } = require('../controllers/userController');


router.get('/:userId/verify', checkVerificationStatus);

module.exports = router;
