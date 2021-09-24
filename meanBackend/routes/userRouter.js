const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;


const jwtHelper = require('../config/jwtHelper');
const ctrUser = require('../controllers/userController');

router.post('/register', ctrUser.register);                                 //create user
router.post('/authenticate', ctrUser.authenticate);                         // login 
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrUser.userProfile); // get userprofile after verification

router.get('/register', ctrUser.getRegister)                                //to get UserList
router.get ('/:id', ctrUser.getID )                                         // to get one user by his id

router.put('/:id', ctrUser.update )                                         // update
router.delete('/:id', ctrUser.delete )                                      // delete user by his id
router.post('/myFriends', ctrUser.friendship)                              // add user as friend
router.put("/:id/status", ctrUser.updateFriendship)                   //find and change the value of friend

module.exports = router;