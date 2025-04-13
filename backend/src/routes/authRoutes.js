const express = require('express');
const { generalLimiter, loginLimiter, registrationLimiter} = require('../utils/rateLimiter');
const { register, login, verifyEmail, requestForgotPassword, resetPassword } = require('../controllers/authController');
const { validateRequestBody } = require('../middlewares/validationMiddleware');
const { userRegistrationSchema, userLoginSchema, resetPasswordSchema } = require('../validation/userValidation');


const router = express.Router();

router.post('/register', registrationLimiter, validateRequestBody(userRegistrationSchema), register);
router.post('/login', loginLimiter, validateRequestBody(userLoginSchema), login);

router.post("/verify-email", generalLimiter, verifyEmail);

router.post("/forgot-password", generalLimiter, requestForgotPassword);
router.post('/reset-password', generalLimiter, validateRequestBody(resetPasswordSchema), resetPassword);

module.exports = router;
