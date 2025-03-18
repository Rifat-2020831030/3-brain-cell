const express = require('express');
const {verifyToken,requireRole } = require('../middlewares/authMiddleware');
const { applyToOrganization, updateApplicationStatus, getOrganizationApplications, getOrganizationVolunteers, getOrganizationTeams, submitDailyReport, createTeamWithMembers } = require('../controllers/organizationController');

const router = express.Router();

router.post('/:orgId/apply', verifyToken, requireRole('volunteer'),applyToOrganization);
router.patch('/applications/:applicationId/status', verifyToken, requireRole('organization'), updateApplicationStatus);
router.get('/applications', verifyToken, requireRole('organization'), getOrganizationApplications);
router.get('/volunteers', verifyToken, requireRole('organization'), getOrganizationVolunteers);
router.post('/create-teams', verifyToken, requireRole('organization'),createTeamWithMembers
);
router.get('/get-teams', verifyToken, requireRole('organization'), getOrganizationTeams);
router.post('/disasters/:disasterId/reports', verifyToken, requireRole('organization'), submitDailyReport);


module.exports = router;
