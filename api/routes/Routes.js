const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const {
    registerController,
    loginController,
    logoutController,
    profileController,
    submitController,
    feedController,
    getPostController,
    updateController } = require("../controllers/Controllers");

const router = express.Router();


router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/profile', profileController);

router.post('/submit', upload.single('file'), submitController);

router.get('/feed', feedController);

router.get('/post/:id', getPostController);

router.patch('/update', upload.single('file'), updateController);

module.exports= router;