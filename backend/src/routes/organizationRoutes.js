const express = require('express');
const {
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
const { updateApplicationStatusSchema, createTeamSchema, submitDailyReportSchema } = require('../validation/organizationValidation');

const router = express.Router();

router.use(verifyToken);
router.use(requireRole('organization'));


router.patch('/applications/:applicationId/status', generalLimiter, validateRequestBody(updateApplicationStatusSchema), updateApplicationStatus);

router.get('/applications',  getOrganizationApplications);

router.get('/volunteers', getOrganizationVolunteers);

router.post('/create-teams', generalLimiter, validateRequestBody(createTeamSchema), createTeamWithMembers);

router.get('/get-teams', getOrganizationTeams);

router.post('/disasters/:disasterId/reports', generalLimiter, validateRequestBody(submitDailyReportSchema),submitDailyReport);

module.exports = router;
