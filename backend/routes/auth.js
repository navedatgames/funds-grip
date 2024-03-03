var express = require("express");
const AuthController = require("../controllers/AuthController");
const { validate, userValidationSchema } = require("../middlewares/validation");

var router = express.Router();

router.post(
  "/register",
  validate(userValidationSchema),
  AuthController.register
);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);

module.exports = router;
