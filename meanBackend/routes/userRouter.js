const express = require('express')
const router = express.Router();

const ctrUser = require('../controllers/userController');

router.post('/register', ctrUser.register);

// router.get('/register', ctrUser.getRegister)
// router.get ('/:id', ctrUser.getID )

// router.put('/:id', ctrUser.update )
// router.delete('/:id', ctrUser.delete )




module.exports = router;