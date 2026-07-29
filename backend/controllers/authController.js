const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {name, email, password } = req.body;

    const existingUser = await User.findOne({
        email
    });

    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        data: user
    });

};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email
    });

    if(!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if(!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    // Generate the JWT here
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.status(200).json({
        success: true,
        token
    });
};

const getProfile = async (req, res) => {
    console.log('Inside getProfile');
    res.status(200).json({
        success: true,
        data: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
};

const getReport = (req, res) => {
    res.json({
        success: true,
        message: "Reports for admin and mangaer"
    });
};

const deleteUser = async (req, res) => {
    res.json({
        success: true,
        message: "User deleted"
    });
};


module.exports = {
    register, login, getProfile, getReport, deleteUser
}