const express = require('express')
const router = express.Router();

const jwtHelper = require('../config/jwtHelper');
const ctrUser = require('../controllers/userController');

router.post('/register', ctrUser.register);

// router.get('/register', ctrUser.getRegister)
// router.get ('/:id', ctrUser.getID )

// router.put('/:id', ctrUser.update )
// router.delete('/:id', ctrUser.delete )

router.post('/authenticate', ctrUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrUser.userProfile);



module.exports = router;