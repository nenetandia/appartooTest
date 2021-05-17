const express    = require('express');
const path       = require('path');
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport = require('passport');

require('./config/config')
require('./config/connection/dbconnect')
require('./config/passportConfig')

// ------- middleware
app.use(bodyParser.json()); 
app.use(cors());
app.use(passport.initialize());
app.use('/api', require('./routes/userRouter'));

// ERRORS in securisation
app.use((err, request, response, next) => {
    if(err.name = 'validationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        response.status(422).send(valErrors)
}
})

// start server
app.listen(3001, () => {
    console.log('server is started at port 3001')
})