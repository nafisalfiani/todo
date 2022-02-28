const { User } = require('../models/index');
const { Op, json } = require('sequelize');
const { decrypt } = require('../helpers/encryption');

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

    static async update(req,res) {
        const user = await User.findAll();

        const payload = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };

        try {
            const user = await User.update(payload, {
                where : { id : req.params.id }
            });
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: `Internal Server Error`});
        }

    }

    static async delete(req,res) {
        const id = { id : req.params.id };

        try {
            const user = await User.destroy({
                where : id
            });
            res.status(200).json({ message: 200 });
        } catch (error) {
            res.status(500).json({message: `Internal Server Error`});
        }
    }

    static async edit(req, res) {
        let payload = {
            username : req.body.username,
            password : req.body.password
        };
        const id = { id: req.params.id }

        try {
            const user = User.update(payload, {
                where : id
            });
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: `Internal Server Error`});
        }
    }

    static async get(req,res) {
        try {
            const user = await User.findAll();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: `Internal Server Error`});
        }
    }
}


module.exports = UserController;