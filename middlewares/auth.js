const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;
        // Verify jwt token.
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(404);
            } else {
                req.user = user;
                next();
            }
        })
    } else if (!authHeader) {
        return res.status(404).json({
            "message": "UnAuthorized user.",
            success: false,
            status: 404
        })
    } else {
        return res.status(400).json({
            "message": "Invalid token.",
            success: false,
            status: 400
        });
    }
}

module.exports = auth;

