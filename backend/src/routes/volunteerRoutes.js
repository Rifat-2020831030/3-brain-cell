const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { getOrganizationsForVolunteer, getOngoingDisasters } = require('../controllers/volunteerController');

const router = express.Router();

router.get('/organizations', verifyToken, requireRole('volunteer'), getOrganizationsForVolunteer);

router.get('/disasters', verifyToken, requireRole('volunteer'), getOngoingDisasters);


module.exports = router;