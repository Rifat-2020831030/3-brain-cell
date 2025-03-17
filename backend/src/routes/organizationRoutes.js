const express = require('express');
const { verifyToken,requireRole } = require('../middlewares/authMiddleware');
const { getOrganizations,createOrganization } = require('../controllers/organizationController');

const router = express.Router();

router.get('/', verifyToken, getOrganizations); 
router.post('/', createOrganization);

module.exports = router;
