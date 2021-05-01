const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (request, response, next) => {
    var token;
    if ('authorization' in request.headers)
        token = request.headers['authorization'].split(' ')[1];
    if (!token)
        return response.status(403).send({ auth: false, message: 'No token provided.'});
    else {
        jwt.verify(token, process.env.JWT_SECRET, 
            (err, decoded) => {
            if (err)
            return response.status(500).send({ auth: false, message: 'Token authentication failed'});
            else {
                request._id = decoded._id;
                next();
            }
        }
    )
    }
}