const mongoose = require('mongoose'); 
var User = mongoose.model('User');
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
const _ = require('lodash')
//require('../config/passportConfig')


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
module.exports.userProfile = (request, response, next) => {
  User.findOne({ _id: request._id }, 
    (err, user) => {
      if (!user)
        return response.status(404).json({ status: false, message: 'User record not found'});
      else 
      return response.status(200).json({status: true, user: _.pick(user, ['fullName', 'email']) });
    })
}






// console.log('here authenticate', user)
//         console.error(err)
//         if(err) return response.status(400).json(err);
//         else if (user) return response.status(200).json({ "token": user.generateJwt() });
//         else return response.status(404).json(info);
//     })(request, response);

// var objectId = require('mongoose').Types.ObjectId;

// exports.getRegister = (request, response) =>{
//     user.find ((err, docs) => {
//         if(!err) {
//             response.send(docs);
//         }
//         else {
//             console.log('Error in rekiving user:', +json.strongfy(err, undefined, 2));
//         }
//     })
// }
// exports.delete = (request, response) => {
//     if(!objectId.isValid(request.params.id))
//         return response.statut(400).send('No record with given id: ${request.params.id}');
//         user.findByIdAndremove(request.params.id, (err, doc) => {
//             if(!err) {
//                 response.send(doc);
//             }else {
//                 console.log(err)
//             }
//         })
// }
// exports.getID = (request, response) => {
//     if(!objectId.isValid(request.params.id))
//     return response.status(400).send('No record with given id: ${request.params.id}');
//     user.findById(request.params.id, (err, docs) => {
//         if (!err) {
//             response.send(docs);
//         }else {
//             console.log(err)
//         }
//     })
// }
// exports.update = (request, response) => {
//     if(!objectId.isValid(request.params.id))
//         return response.status(400).send('No record with given id: ${request.params.id}');
//         var user = new User();
//             user.Name = request.body.Name;
//             user.Surname = request.body.Surname;
//             user.email = request.body.email;
//             user.password = request.body.password;
// }




// exports.login = (request, response, next) => {
//     const username = request.body.email
//     const password = request.body.password

//     user.findone({$or: [{mail:username}]})
//     .then(user => {
//         if(user){
//             bcrypt.compare(password, user.password, function(err, result){
//                 if(err) {
//                     response.json({error:err})
//                 } if(result) {
//                     let token = jwt.sign({Name: user.name}, 'verysecretValue', {expiresIn : '1h'})
//                     response.json({message: 'login successful', token})
//                 }else {
//                     response.json({message: 'password does not matched'})
//                 }
//             })
//         }else {
//             response.json({message: 'no user found' })
//         }
//     })
// }
