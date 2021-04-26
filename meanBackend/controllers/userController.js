const mongoose = require('mongoose'); 
const bcrypt   = require('bcryptjs')
const User = mongoose.model('User');
const jwt      = require('jsonwebtoken');
const router = require('../routes/userRouter');
const bodyParser = require('body-parser');

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


exports.register = (request ,response, next) => {
    var user = new User();
    user.fullName = request.body.fullName;
    user.email = request.body.email;
    user.password = request.body.password;
    user.save((err, doc) => {
         if(!err)
        response.send(doc);
        else 
        response.send(err);  
    });
}


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

// exports.register = async (request, response, next) => {

//     let hashedPass = await bcrypt.hash(request.body.password, 8);
//     console.log(hashedPass);    

//     let user = new User({ 
//         Name : request.body.Name,
//         email : request.body.email,
//         password : hashedPass
//     })
//     user.save()
//     .then(user => {
//         response.json({message: 'Vous avez bien été ajouté'})
//     })
//     .catch(error => {
//         response.json({message: 'An erroor occured'})
//     })
// }

// else {
//     console.log('jkklll', err)
//         if (err.code = 11000)
//             response.status(422).send(['duplicate email address found']);
//         else
//             return next(err) ;
//     } 