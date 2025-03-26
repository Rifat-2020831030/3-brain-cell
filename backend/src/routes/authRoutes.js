const express = require('express');
const { register, login, verifyEmail, requestForgotPassword, resetPassword } = require('../controllers/authController');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { userRegistrationSchema, userLoginSchema, resetPasswordSchema } = require('../validation/userValidation');


const router = express.Router();

router.post('/register', validateRequest(userRegistrationSchema), register);
router.post('/login', validateRequest(userLoginSchema), login);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", requestForgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);

module.exports = router;
