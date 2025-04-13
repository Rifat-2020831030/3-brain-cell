const express = require('express');
const {
    applyToOrganization,
    getOrganizationsForVolunteer,
    getOngoingDisasters
 } = require('../controllers/volunteerController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { generalLimiter } = require('../utils/rateLimiter');

const router = express.Router();

router.use(verifyToken);
router.use(requireRole('volunteer'));

router.post('/:orgId/apply', generalLimiter, applyToOrganization);

router.get('/organizations', getOrganizationsForVolunteer);

router.get('/disasters', getOngoingDisasters);

module.exports = router;
