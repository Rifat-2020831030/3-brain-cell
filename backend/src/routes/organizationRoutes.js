const express = require('express');
const {
    joinDisaster,
    updateApplicationStatus,
    getOrganizationApplications,
    getOrganizationTeams,
    getOrganizationVolunteers,
    submitDailyReport,
    createTeamWithMembers    
} = require('../controllers/organizationController');
const { generalLimiter } = require('../utils/rateLimiter');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { validateRequestBody } = require('../middlewares/validationMiddleware');
const { 
   
    updateApplicationStatusSchema, 
    createTeamSchema, 
    submitDailyReportSchema } = require('../validation/organizationValidation');

const router = express.Router();

router.use(verifyToken);
router.use(requireRole('organization'));

router.use(generalLimiter);

router.post('/disasters/:disasterId/join', joinDisaster);

router.patch('/applications/:applicationId/status', validateRequestBody(updateApplicationStatusSchema), updateApplicationStatus);

router.get('/applications',  getOrganizationApplications);

router.get('/volunteers', getOrganizationVolunteers);

router.post('/create-teams', validateRequestBody(createTeamSchema), createTeamWithMembers);

router.get('/get-teams', getOrganizationTeams);

router.patch('/disasters/:disasterId/reports',  validateRequestBody(submitDailyReportSchema),submitDailyReport);

module.exports = router;
