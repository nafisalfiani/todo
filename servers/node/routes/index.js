const router = require('express').Router();
const user = require('./user/user');
const task = require('./task/task');

router.use('/user', user);
router.use('/task', task);
router.get('/', (req, res) => {
    res.send('Hello?')
})

module.exports = router;