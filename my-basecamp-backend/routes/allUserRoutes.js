const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/allUserController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register); 
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);

module.exports = router;

