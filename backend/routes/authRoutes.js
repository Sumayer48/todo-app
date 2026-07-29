const express = require('express');

const router = express.Router();

const { 
    register, login, getProfile, getReport, deleteUser 
} = require('../controllers/authController');

const {
    protect,
    authorize
} = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.get("/reports", protect, authorize("admin", "manager"), getReport);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);


module.exports = router;