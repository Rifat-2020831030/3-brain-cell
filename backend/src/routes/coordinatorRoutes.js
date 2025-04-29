const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { generalLimiter } = require('../utils/rateLimiter');
const { 
  validateRequestBody 
} = require('../middlewares/validationMiddleware'); 
const { 
    createDisasterSchema,
    updateDisasterSchema,
    approveAnOrganizationSchema,
    assignDisasterToTeamSchema, 
    updateTeamSchema,
    emergencyNotificationSchema, 
 } = require('../validation/coordinatorValidation');

 const {
    createDisaster,
    updateDisaster,
    deleteDisaster,
    getDisasters,
    closeDisaster,
    approveOrganization,
    getAllOrganizations,
    getTeamsByDisasterId,
    assignTeamLocation,
    updateTeam,
    deleteTeam,
    getDisasterStats,
    sendEmergencyNotification
 } = require('../controllers/coordinatorController');

const router = express.Router();


router.use(verifyToken);
router.use(requireRole('coordinator'));

router.use(generalLimiter);


router.post('/disasters',  validateRequestBody(createDisasterSchema), createDisaster);

router.put('/disasters/:disasterId', validateRequestBody(updateDisasterSchema), updateDisaster );

router.delete('/disasters/:disasterId',deleteDisaster);

router.patch('/disasters/:disasterId/close', closeDisaster);

router.get('/disasters', getDisasters);

router.get('/organizations', getAllOrganizations);

router.patch('/organizations/:orgId/status-update', validateRequestBody(approveAnOrganizationSchema), approveOrganization);

router.get('/teams/:disasterId', getTeamsByDisasterId);

router.post('/teams/:teamId/assign-location', assignTeamLocation);

router.patch('/teams/:teamId', validateRequestBody(updateTeamSchema), updateTeam);

router.delete('/teams/delete/:teamId', deleteTeam);

router.get('/disasters/:disasterId/stats', getDisasterStats);

router.post('/send-notification',  validateRequestBody(emergencyNotificationSchema), sendEmergencyNotification);

module.exports = router;
