const express = require('express');
const { register, login, verifyEmail, requestForgotPassword, resetPassword } = require('../controllers/authController');
const { validateRequestBody } = require('../middlewares/validationMiddleware');
const { userRegistrationSchema, userLoginSchema, resetPasswordSchema } = require('../validation/userValidation');


const router = express.Router();

router.post('/register', validateRequestBody(userRegistrationSchema), register);
router.post('/login',validateRequestBody(userLoginSchema), login);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", requestForgotPassword);
router.post('/reset-password', validateRequestBody(resetPasswordSchema), resetPassword);

module.exports = router;
