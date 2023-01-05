const userControllers = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/adduser',userControllers.postAddUsers);

module.exports = router;