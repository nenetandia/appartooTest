const mongoose = require('mongoose'); 
var User = mongoose.model('User');
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
const _ = require('lodash')
var ObjectId = require('mongoose').Types.ObjectId;

//require('../config/passportConfig')

// create new user and save in mongodb
exports.register = (request ,response, next) => {
    var user = new User();
    user.fullName = request.body.fullName;
    user.age = request.body.age;
    user.group = request.body.group;
     user.race = request.body.race;
    user.food = request.body.food;
    user.email = request.body.email;
    user.password = request.body.password;   
    user.save((err, doc) => {
         if(!err)
        response.send(doc);
        else {
        response.send(err);
      }  
    });
}

// autentification for user
exports.authenticate = (request, response, next) => {
    
    passport.authenticate('local', (err, user, info) => {
       
    // If Passport throws/catches an error
    if (err) {
      return response.status(400).json(err);
    }
    // If a user is found
    else if(user){
      console.log('here my user ---- ', user)
      return response.status(200).json({"token": user.generateJwt() });
     
    } else {
      // If user is not found
      response.status(404).json(info);
    }
  })(request, response);

};

// get userprofile after autentication 
module.exports.userProfile = (request, response, next) => {
  User.findOne({ _id: request._id }, 
    (err, user) => {
      if (!user)
        return response.status(404).json({ status: false, message: 'User record not found'});
      else 
      return response.status(200).json({status: true, user: _.pick(user, ['fullName', 'email', 'age', 'race', 'group', 'food']) });
    })
}
// get list of all uer saved in mongodb
exports.getRegister = (request, response) =>{
  User.find((err, docs) => {
    if (!err) { response.send(docs); }
    else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
  });
}
// get ID of user
 exports.getID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    User.findById(req.params.id, (err, doc) => {
      console.log('this is ', doc)
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
}
// update userdetails
    exports.update = (request, response) => {
      if (!ObjectId.isValid(request.params.id))
      return response.status(400).send(`No record with given id : ${request.params.id}`);

        var user = {
          fullName : request.body.fullName,
          age : request.body.age,
          group : request.body.group,
          race : request.body.race,
          food : request.body.food,
          email : request.body.email,
          password : request.body.password
        };
        User.findByIdAndUpdate(request.params.id, { $set: user }, { new: true }, (err, doc) => {
            if (!err) { response.send(doc); }
            else { console.log('Error in Updating User :' + JSON.stringify(err, undefined, 2)); }
        });
      }

// delete
  exports.delete = (request, response) => {

    if (!ObjectId.isValid(request.params.id))
    return response.status(400).send(`No record with given id : ${request.params.id}`);

    User.findByIdAndRemove(request.params.id, (err, doc) => {
      if (!err) { response.send(doc); }
      else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }
//friends
exports.friendship = (request, response) => {
  User.find({ 'friend': true }, (err, result)  => {
    if(err) 
    console.log(err)
    else {
      response.json({
          res: result,
          success: true,
      });
    }

  });
}
// find friend value et update it 
exports.updateFriendship = (request, response) => {
  if (!ObjectId.isValid(request.params.id))
      return response.status(400).send(`No record with given id : ${request.params.id}`);

        var user = {
          fullName : request.body.fullName,
          age : request.body.age,
          group : request.body.group,
          race : request.body.race,
          food : request.body.food,
          email : request.body.email,
          password : request.body.password,
          friend  : "false"
        };
        User.findByIdAndUpdate(request.params.id, {$set: {friend: true}}, (err, doc) => {
            if (!err) { response.send(doc); }
            else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
        });
  
};











