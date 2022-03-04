const express = require('express');
const { default: axios } = require('axios');

const Redis = require('ioredis');
const redis = new Redis();
const port = 3001;
const app = express();

app.use(express.json());

// app.get('/listOfUser' , async (req , res)=>{
//     try {
//         const listOfUser = await axios.get('http://localhost:3000/user/list');
//         const data = listOfUser.data;
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err)
//     }
//  })

// Caching get all user.

app.get('/listOfUser' , async (req , res)=>{
    try {
        const cache = await redis.get('/user/list')
        if (cache) {
            res.status(200).json(JSON.parse(cache));
            
        } else {
            const listOfUser = await axios.get('http://localhost:3000/user/list');
            const data = listOfUser.data;
            await redis.set('/listOfUser', JSON.stringify(data))
            res.status(200).json(data)
        }
    } catch (err) {
        res.status(500).json(err)
    }
 })

 app.get('/todo/:id/history' , async (req , res)=>{
    try {
        let id = req.params.id
        const todo = await axios.get(`http://localhost:8090/todo/${id}/history`);
        const data = todo.data;
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
 })

 app.post('/task/create' , async (req , res)=>{
    try {
        const todo = await axios({
            method: 'post',
            url: `http://localhost:3000/task/create`,
            data: req.body,
        })

        const todo_history = await axios({
            method: 'post',
            url: `http://localhost:8090/todo/${id}/history`,
            data: req.body,
          });
        
          const data = todo_history.data
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
 })

 app.put('/task/update/:id' , async (req , res)=>{
    try {
        let id = req.params.id

        const todo = await axios({
            method: 'put',
            url: `http://localhost:3000/task/update/${id}`,
            data: req.body,
        })

        const todo_history = await axios({
            method: 'post',
            url: `http://localhost:8090/todo/${id}/history`,
            data: req.body,
          });
          
        const data = todo_history.data;
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
 })

app.post('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

module.exports = app;