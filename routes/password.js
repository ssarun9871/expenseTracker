const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');

router.post('/forgotpassword',passwordController.reqPasswordReset);
router.get('/resetpassword/:id',passwordController.resetpassword);
router.get('/updatepassword/:resetpasswordid', passwordController.updatepassword)

module.exports = router; 