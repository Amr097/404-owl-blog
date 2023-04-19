const express = require('express');

const {
    registerController,
    loginController,
    logoutController,
    profileController  } = require("../controllers/Controllers");

const router = express.Router();


router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/profile', profileController);

module.exports= router;