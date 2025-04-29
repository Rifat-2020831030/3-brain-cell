const express = require('express');
const {
    applyToOrganization,
    getOrganizationsForVolunteer,
    getOngoingDisasters,
    leaveOrganization
 } = require('../controllers/volunteerController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { generalLimiter } = require('../utils/rateLimiter');

const router = express.Router();

router.use(verifyToken);
router.use(requireRole('volunteer'));

router.use(generalLimiter);

router.post('/:orgId/apply',  applyToOrganization);

router.get('/organizations', getOrganizationsForVolunteer);

router.get('/disasters', getOngoingDisasters);

router.post('/leave-organization', leaveOrganization);

module.exports = router;
