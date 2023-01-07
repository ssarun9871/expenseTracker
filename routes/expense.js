const expenseControllers = require('../controllers/expense');
const express = require('express');
const userAuthentication = require('../middleware/auth')
const router = express.Router();

router.post('/',userAuthentication.authenticate,expenseControllers.postAddExpense);
router.get('/delete/:id',expenseControllers.getDeleteExpense);
router.get('/data',userAuthentication.authenticate,expenseControllers.getAllData);

module.exports = router;