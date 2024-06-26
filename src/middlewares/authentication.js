require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwt_authentication = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ status: false, message: "Access Denied, No Token Provided" });
        }

        const token = req.headers.authorization.replace('Bearer ', '').trim();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;

        next();
    } catch (err) {
        console.error("jwt_authentication error: ", err.message);
        return res.status(401).json({ status: false, message: "Invalid Token" });
    }
};

module.exports = { authenticationMiddleware: jwt_authentication };
