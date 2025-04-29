const express = require('express');
const router = express.Router();
const { 
    checkVerificationStatus, 
    fetchOngoingDisasters, 
    fetchTeamSummariesByDisaster,
    getLocationKeyByCity,
    getLocationInfoByKey
   } = require('../controllers/userController');
const { generalLimiter } = require('../utils/rateLimiter');

router.use(generalLimiter);


router.get('/:userId/verify', checkVerificationStatus);

router.get('/disasters', fetchOngoingDisasters);

router.get('/disasters/teams/:disasterId' , fetchTeamSummariesByDisaster);

router.get('/city/:city',  getLocationKeyByCity);

router.get('/key/:locationKey', getLocationInfoByKey);

module.exports = router;
