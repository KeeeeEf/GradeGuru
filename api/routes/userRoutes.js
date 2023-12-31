const express=require('express');
const router = express.Router();
//const authenticateValidator =require('../validations/authenticationValidator')
const {updateUser,retrieveAll,retrieveByParams,retrieveCountByParams, retrieveCountByAccountType,deleteRecord}=require('../controller/userController')

router.post('/edit',updateUser);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.get('/retrieve_count',retrieveCountByParams);
router.get('/retrieve_accounts', retrieveCountByAccountType)
router.post('/delete',deleteRecord);

module.exports = router;