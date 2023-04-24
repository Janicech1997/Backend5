const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/users");
const userService = require("../services/user");

const UserService = new userService(userModel);

router.get("/me", async (req, res) => {
  //   const sessionUser = req.user;
  //   if (!sessionUser) {
  //     return res.send({
  //       message: "Aquí no es tu lugar ",
  //     });
  //   }
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await userModel.findById(req.query.id);

    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    res.status(500).json({
      req: req.query,
    });
  }
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const user = await UserService.create(body);
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          id: user.id,
          token: token,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
