const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

const express = require("express");
const router = express.Router();

// router.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Accept"
//   );
//   next();
// });

router.get("/test/all", controller.allAccess);

router.get("/test/user", [authJwt.verifyToken], controller.userBoard);


router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = router