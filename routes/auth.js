const express = require('express');

const router = express.Router();


//controllers
const { postSignUp, login, verifySignup } = require('../Controllers/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');




router.route("/signUp").post(postSignUp);

router.route("/login").post(login);

router.get("/:token", verifySignup)













module.exports = router;