require('dotenv').config();
const User = require('../../mongodb/userSchema');

const admin_authorization = async (req, res, next) => {
    try {
        // write jwt authorization code
        if(!req.user_details) return res.status(401).json({status: false, message: "Unauthorized operation"})
        
        const user = await User.find({$or: [{user_id: req.user_details.user_id}, {email: req.user_details.email}]});

        if(user.user_role == 'user')
        {
            return res.status(401).json({status: false, message: "Unauthorized User"});
        }
          
        next();
    } catch (err) {
        console.error("jwt_authentication", err.message);
        return res.status(401).json({status: false, message: "Unauthorized operation"});
    }
}

const super_admin_authorization = async (req, res, next) => {
    try {
        // write jwt authorization code
        if(!req.user_details) return res.status(401).json({status: false, message: "Unauthorized operation"})
        
        const user = await User.find({$or: [{user_id: req.user_details.user_id}, {email: req.user_details.email}]});

        if(user.user_role != 'super_admin')
        {
            return res.status(401).json({status: false, message: "Unauthorized User"});
        }
          
        next();
    } catch (err) {
        console.error("jwt_authentication", err.message);
        return res.status(401).json({status: false, message: "Unauthorized operation"});
    }
}

module.exports = {adminAuthorizationMiddleware: admin_authorization, superAdminAuthorizationMiddleware: super_admin_authorization};