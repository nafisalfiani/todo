const { Task } = require('../../models/index');

class TaskController {
    static create(req, res) {
        const { title, description, priority, status, due_date } = req.body;

        Task.create({title, description, priority, status, due_date })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static async update(req,res) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            due_date: req.body.due_date
        };

        try {
            const task = await Task.update(payload, {
                where : { id : req.params.id }
            });
            res.status(200).json(task);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: `Internal Server Error`});
        }

    }
}

module.exports = TaskController;