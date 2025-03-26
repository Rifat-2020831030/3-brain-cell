const express = require('express');
const {
    applyToOrganization,
    updateApplicationStatus,
    getOrganizationApplications,
    getOrganizationTeams,
    getOrganizationVolunteers,
    submitDailyReport,
    createTeamWithMembers    
} = require('../controllers/organizationController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { validateRequestBody } = require('../middlewares/validationMiddleware');
const { updateApplicationStatusSchema, createTeamSchema, submitDailyReportSchema } = require('../validation/organizationValidation');

const router = express.Router();

router.use(verifyToken);
router.use(requireRole('organization'));

router.post('/:orgId/apply', applyToOrganization);

router.patch('/applications/:applicationId/status', validateRequestBody(updateApplicationStatusSchema), updateApplicationStatus);

router.get('/applications', getOrganizationApplications);

router.get('/volunteers', getOrganizationVolunteers);

router.post('/create-teams', validateRequestBody(createTeamSchema), createTeamWithMembers);

router.get('/get-teams', getOrganizationTeams);

router.post('/disasters/:disasterId/reports', validateRequestBody(submitDailyReportSchema),submitDailyReport);

module.exports = router;
