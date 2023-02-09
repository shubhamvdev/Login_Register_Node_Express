const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/auth/signin", controller.signin);

router.post("/auth/signout", controller.signout);

module.exports = router
