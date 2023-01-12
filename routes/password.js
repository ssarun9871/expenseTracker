const express = require('express');
const router = express.Router();
const passwordContoller = require('../controllers/password');

router.get('/forgotpassword',passwordContoller.resetpassword);

module.exports = router;