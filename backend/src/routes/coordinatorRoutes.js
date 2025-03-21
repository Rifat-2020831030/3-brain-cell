const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const { getCoordinators,createCoordinator } = require('../controllers/coordinatorController');

const router = express.Router();

router.get('/', verifyToken, getCoordinators);
router.post('/', createCoordinator);

module.exports = router;
