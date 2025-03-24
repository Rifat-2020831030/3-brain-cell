const express = require('express');
const { createDisaster, getDisasterStats, approveOrganization, assignDisasterToTeam, getAllTeams, sendEmergencyNotification, getDisasters} = require('../controllers/coordinatorController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post( '/disasters', verifyToken, requireRole('coordinator'), createDisaster);
router.get( '/disasters/:id?', verifyToken,  requireRole('coordinator'),  getDisasters );
router.patch( '/organizations/:orgId/approve',  verifyToken,  requireRole('coordinator'),
approveOrganization);
router.get('/teams', verifyToken, requireRole('coordinator'), getAllTeams);
router.post('/disasters/assign-team', verifyToken, requireRole('coordinator'),assignDisasterToTeam);
router.get( '/disasters/:disasterId/stats',verifyToken, requireRole('coordinator'),  getDisasterStats);
router.post('/send-notification', verifyToken, requireRole('coordinator'), sendEmergencyNotification);



module.exports = router;
