import express from 'express';
import authenticateJWT from '../middleware/auth.js'

import {postLoginCreds, validateCreds, getAddressesbyUser, postNewAddress, deleteAddress, getCurrentUser, authTest} from '../controllers/user.js';

const router = express.Router();

router.post('/', postLoginCreds);
router.post('/validate', validateCreds);
router.get('/getAddressesbyUser', authenticateJWT, getAddressesbyUser);
router.post('/addNewAddress', authenticateJWT, postNewAddress);
router.delete('/removeAddress', deleteAddress);
router.get('/getcurrentuser', authenticateJWT, getCurrentUser)
router.get('/authtest', authenticateJWT, authTest);

 
export default router;