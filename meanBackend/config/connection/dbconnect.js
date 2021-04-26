const mongoose = require('mongoose') ;

mongoose.connect("mongodb+srv://dbuser:pass@cluster0.v5rzr.mongodb.net/test", {
    useUnifiedTopology: true, 
    useNewUrlParser: true, useCreateIndex: true, 
}, (err) => {
    if(!err) {
        console.log('mongo db connection is established')
    }else {
        console.log('error in db connection')
    }
});
require('../../models/usermodel')