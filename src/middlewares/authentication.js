require('dotenv').config();

const jwt_authentication = async (req, res, next) => {
    try {
        const token = req.headers('Authorization').replace('Bearer', '');
        if(!token) return res.status(401).json({status: false, message: "Access Denied, Please provide token"})
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_details = decoded;
        next();
    } catch (err) {
        console.error("jwt_authentication", err.message);
        return res.status(401).json({status: false, message: "Invalid Token"});
    }
}

module.exports = {authenticationMiddleware: jwt_authentication};