const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { getVolunteers,createVolunteer } = require('../controllers/volunteerController');

const router = express.Router();

router.get('/', verifyToken, getVolunteers);
router.post('/', createVolunteer); 

module.exports = router;