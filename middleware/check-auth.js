const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // console.log(req.headers);
    try {
        // token "asdaewew"
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        //tempare the req data
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        console.log(req.userData);

        next();

    } catch (e) {
        res.status(401).json({
            message: 'auth failed'
        })
    }
}