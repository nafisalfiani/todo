const router = require('express').Router();
const { UserController } = require('../../controllers/index');

router.get('/', (req, res) => {
    res.send('Hello from user?')
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update/:id', UserController.update);
router.patch('/edit/:id', UserController.edit);
router.delete('/delete/:id', UserController.delete);
router.get('/list', UserController.get);

module.exports = router;