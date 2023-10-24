const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//* Register Route
router.post("/register", validInfo, async (req, res) => {
  try {
    // Destructure request body
    const { email, username, password, rePassword } = req.body;

    // Check if username already exists in DB
    const user = await User.findOne({
      // where: {
      username: username,
      // },
    });

    if (user) {
      return res.status(401).json("User already exists");
    }

    // Bcrypt the password and re-typed password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const bcryptRePassword = await bcrypt.hash(rePassword, salt);

    const newUser = new User({
      email,
      username,
      password: bcryptPassword,
      rePassword: bcryptRePassword,
    });

    await newUser.save();
    // Generate JWT token
    const token = jwtGenerator(newUser._id);

    res.json({ token, message: "User registered successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//* Login Route
router.post("/login", validInfo, async (req, res) => {
  try {
    // Destructure request body
    const { username, password } = req.body;

    // Check if user doesn't exists
    const user = await User.findOne({
      // where: {
      username: username,
      // },
    });

    if (!user) {
      return res.status(400).json({
        isError: true,
        message: "Password or Username is incorrect",
      });
    }

    // Check if incoming password is the same as the DB password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        isError: true,
        message: "Password is incorrect",
      });
    }

    // Return user a JWT token
    const token = jwtGenerator(user._id);

    res.json({ token, message: "loggedin successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
