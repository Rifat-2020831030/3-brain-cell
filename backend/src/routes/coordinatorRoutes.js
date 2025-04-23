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
    getAllTeams,
    assignDisasterToTeam,
    getDisasterStats,
    getLocationKeyByCity,
    getLocationInfoByKey,
    sendEmergencyNotification
 } = require('../controllers/coordinatorController');

const router = express.Router();


router.use(verifyToken);
router.use(requireRole('coordinator'));

router.use(generalLimiter);


router.post('/disasters',  validateRequestBody(createDisasterSchema), createDisaster);

router.put('/disasters/:id', validateRequestBody(updateDisasterSchema), updateDisaster );

router.delete('/disasters/:id',deleteDisaster);

router.patch('/disasters/:disasterId/close', closeDisaster);

router.get('/disasters', getDisasters);

router.get('/organizations', getAllOrganizations);

router.patch('/organizations/:orgId/status-update', validateRequestBody(approveAnOrganizationSchema), approveOrganization);

router.get('/teams', getAllTeams);

router.post('/disasters/assign-team', validateRequestBody(assignDisasterToTeamSchema), assignDisasterToTeam);

router.get('/disasters/:disasterId/stats', getDisasterStats);

router.get('/city/:city',  getLocationKeyByCity);

router.get('/key/:locationKey', getLocationInfoByKey);

router.post('/send-notification',  validateRequestBody(emergencyNotificationSchema), sendEmergencyNotification);

module.exports = router;
