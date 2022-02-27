const router = require('express').Router();
const { UserController } = require('../controllers/index');

router.get('/', (req, res) => {
    res.send('Hello from user?')
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;