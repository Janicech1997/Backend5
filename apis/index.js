const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const productRouter = require("./product")
const authRouter = require("./auth");
const authMiddleware = require("../middleware/authorization");
const registerRouter = require("./register");

router.use("/auth", authRouter);
router.use("/register", registerRouter);
router.use("/products", productRouter)

router.use(authMiddleware);
router.use("/user", userRouter);

module.exports = router;
