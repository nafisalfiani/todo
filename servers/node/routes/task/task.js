const router = require('express').Router();
const { TaskController } = require('../../controllers/index');

router.post('/create', TaskController.create);
router.put('/update/:id', TaskController.update);

module.exports = router