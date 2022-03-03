const express = require('express');
const { default: axios } = require('axios');

const Redis = require('ioredis');
const redis = new Redis();
const port = 3001;
const app = express();

app.use(express.json());
// app.use(router);

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.get('/listOfUser' , async (req , res)=>{
    // res.send('hello from simple server :)')
    try {
        const listOfUser = await axios.get('http://localhost:3000/user/list');
        const data = listOfUser.data;
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
 })

app.get('/list' , async (req , res)=>{
    // res.send('hello from simple server :)')
    try {
        const cache = await redis.get('user/list');
        if (cache) {
            res.status(200).json(JSON.parse(cache));
        } else {
            const list = await axios.get('http://localhost:3000/user/list');
            const data = list.data;
            await redis.set('user/list', JSON.stringify(data));
            res.status(200).json(cache);
        }

    } catch (err) {
        res.status(500).json(err)
    }
 })




app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

module.exports = app;