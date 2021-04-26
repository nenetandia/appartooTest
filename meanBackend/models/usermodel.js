const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');


var userShema = new mongoose.Schema({
    fullName:{
        type    : String, 
        required: 'fullName is required'
    },
    
    email: {
        type     : String,
        required : 'Email address is required',
        lowercase: true,
        validate : {
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
        },

    },
    password: {
        type     : String,
        required : 'password is required',
        minlength: [6, 'password must contain at least 6 character']
    },
    saltSecret: String
});
// ----------- securing -----------------
userShema.path('email').validate((val) => {
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(val);
}, 'invalid email.');

userShema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userShema);
