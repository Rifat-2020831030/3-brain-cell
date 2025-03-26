const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { 
  validateRequestBody 
} = require('../middlewares/validationMiddleware'); 
const { 
    createDisasterSchema,
    assignDisasterToTeamSchema, 
    emergencyNotificationSchema
 } = require('../validation/coordinatorValidation');

 const {
    createDisaster,
    getDisasters,
    approveOrganization,
    getAllTeams,
    assignDisasterToTeam,
    getDisasterStats,
    sendEmergencyNotification
 } = require('../controllers/coordinatorController');

const router = express.Router();


router.use(verifyToken);
router.use(requireRole('coordinator'));


router.post('/disasters', validateRequestBody(createDisasterSchema), createDisaster);


router.get('/disasters', getDisasters);


router.patch('/organizations/:orgId/approve', approveOrganization);


router.get('/teams', getAllTeams);


router.post('/teams/assign', validateRequestBody(assignDisasterToTeamSchema), assignDisasterToTeam);


router.get('/disasters/:disasterId/stats', getDisasterStats);

router.post('/notifications/emergency', validateRequestBody(emergencyNotificationSchema), sendEmergencyNotification);

module.exports = router;
