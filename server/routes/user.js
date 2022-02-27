const router = require('express').Router();
const { UserController } = require('../controllers/index');

router.get('/', (req, res) => {
    res.send('Hello from user?')
});

router.post('/register', UserController.register);
// router.post('/test', UserController.test);


module.exports = router;