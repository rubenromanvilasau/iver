const jwt = require('jsonwebtoken');

module.exports = async( req, res, next ) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];

        const decodedToken = await jwt.verify( token, process.env.JWT_SECRET );

        const user = await decodedToken;
        req.user = user;

        next();

    } catch ( err ) {
        res.status(401).send({ message: 'Auth failed' });
    }
};