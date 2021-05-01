const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
var User = mongoose.model('User');

console.log('here its gonna be a test ', User);
passport.use(
    new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        
            console.log('here in passportConfig', username),
            User.findOne({ email : username},
                console.log('here in passportConfig2', username),

                (err, user) => {
                    console.log('here in passportConfig3', user);

                    if(err) {
                        throw err;
                    }
                    else if (!user) {
                        return done(null, false, { 
                            message: 'Email is not registered'
                        });
                    }
                        
                    else if(!user.verifyPassword(password)) {
                        return done(null, false, {
                             message: 'Wrong password'
                            });
                        }
                    else
                        return done(null, user)
                }
            );
    })
);