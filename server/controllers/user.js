const { User } = require('../models/index');
const { Op } = require('sequelize');
const { encrypt, decrypt } = require('../helpers/encryption');

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
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    
    static async login(req, res) {
        const username = req.body.username;
        const email = req.body.email;
        console.log('>>>> masuk sini');

        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { 
                            username: {
                                [Op.like]: '%lv%'
                            }
                        },
                    ]
                }
            });

            console.log(user);

            if (!user) {
                res.status(401).json({ msg: `Invalid Account`});
            } else {
                if (decrypt(user.password) === req.body.password) {
                res.status(200).json({ user });
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: `Internal Server Error`});
        }
    }

    // static test(req, res) {
    //     res.send('Hello register')
    // }
}

module.exports = UserController;