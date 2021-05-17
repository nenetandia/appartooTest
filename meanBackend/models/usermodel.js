const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt = require('jsonwebtoken');

// -------- MongoDB data schema
var userShema = new mongoose.Schema({
    fullName:{
        type    : String, 
        required: 'fullName is required'
    },
    age:{
        type    : String, 
        required: 'age is required'
    },
    group:{
        type    : String, 
        required: 'group is required'
    },
    race:{
        type    : String, 
        required: 'race is required'
    },
   food:{
        type    : String, 
        required: 'food is required'
    },
    
    email: {
        type     : String,
        required : 'Email address is required',
        lowercase: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'The email address is already taken!'
        }
        
    },
    friend  :{
        type: Boolean,
        default : "false"
    },
    password: {
        type     : String,
        required : 'password is required',
        minlength: [6, 'password must contain at least 6 character']
    },
    saltSecret: String
});
// ----------- validation email -----------------
userShema.path('email').validate((val) => {
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(val);
}, 'invalid email.');

// -------- pre save
userShema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
// --------checking the password
userShema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
//  -------- generating the JWT
userShema.methods.generateJwt = function () {
    console.log('toto');
    return jwt.sign({ _id: this._id }, 
         process.env.JWT_SECRET, 
         {
            expiresIn: process.env.JWT_EXP
         });
};

mongoose.model('User', userShema);
 
