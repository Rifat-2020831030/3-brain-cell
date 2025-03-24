const express = require('express');
const { register, login, verifyEmail, requestForgotPassword, resetPassword } = require('../controllers/authController');
const { validateUserRegistration, validateUserLogin, validatePasswordReset } = require('../middlewares/validationMIddleware');


const router = express.Router();

router.post("/register", validateUserRegistration, register);
router.post("/login", validateUserLogin, login);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", requestForgotPassword);
router.post("/reset-password", validatePasswordReset, resetPassword);

module.exports = router;
