const router = require('express').Router();
const user = require('./user');

router.use('/user', user);
router.get('/', (req, res) => {
    res.send('Hello?')
})

module.exports = router;