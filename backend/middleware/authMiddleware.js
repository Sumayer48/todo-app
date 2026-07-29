const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(
            !authHeader ||
            !authHeader.startsWith('Bearer')
        ) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const token = authHeader.split(" ")[1];

        console.log('1');

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log('2');

        const user = await User.findById(decoded.id);

        console.log('3');

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });

        }

        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);

        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
        next();
    }
};

module.exports = {
    protect,
    authorize
};