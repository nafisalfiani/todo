const { User } = require('../models/index');

class UserController {
    static async register(req, res) {
        const payload = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };

        try {
            const user = await User.create(payload);
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    // static test(req, res) {
    //     res.send('Hello register')
    // }
}

module.exports = UserController;