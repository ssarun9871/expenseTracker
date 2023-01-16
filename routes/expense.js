const expenseControllers = require('../controllers/expense');
const express = require('express');
const userAuthentication = require('../middleware/auth')
const router = express.Router();

router.get('/updaterow/:rows',userAuthentication.authenticate,expenseControllers.updateRowPreference);
router.get('/delete/:id',expenseControllers.getDeleteExpense);
router.get('/data',userAuthentication.authenticate,expenseControllers.getAllData);
router.get('/membership',userAuthentication.authenticate,expenseControllers.checkMembership);
router.post('/',userAuthentication.authenticate,expenseControllers.postAddExpense);
router.get('/downloadexpense',userAuthentication.authenticate,expenseControllers.downloadexpense);


module.exports = router;    