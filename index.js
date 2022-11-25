const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./config/db.config');
const User = require('./models/user.model');
const Exercise = require('./models/exercise.model');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async function(req,res){
  let username = req.body.username;
  let user = await User.create({username});
  res.json({username:user.username, _id:user._id});
});

app.get('/api/users', async function(req,res){
  let users = await User.find({});
  let userList = [];
  for(let i = 0; i<users.length; i++){
    userList.push({
      username:users[i].username,
      _id:users[i]._id
    });
  }
  res.send(userList);
})

app.post('/api/users/:_id/exercises', async function(req,res){
    let date = null;
    if(!req.body.date){
      date = new Date();
    }else{
      date = new Date(req.body.date);
    }

    let userId = req.params._id;
    let user = await User.findById(userId);
   
    let exercise = await Exercise.create({
      userId,
      username:user.username,
      date,
      duration:req.body.duration,
      description:req.body.description
    });

    let response = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: exercise.userId
    }
  
    res.json(response);
    
});

app.get('/api/users/:_id/logs', async function(req,res){
    let userId = req.params._id;
    
    let from = req.query.from || null;
    let to = req.query.to || null;
    let limit = req.query.limit || null;

    let user = await User.findById(userId);
    let exercises;

    let filter = {
      userId:user._id.toString()
    }

    if(from && to){
      filter.date = {
        $gte : new Date(from),
        $lte: new Date(to)
      }
    }
  
  if(!limit){
     exercises = await Exercise.find(filter);
  }else{
    exercises = await Exercise.find({
      userId: user._id
    }).limit(Number(limit));
  }
  let count = exercises.length;
  let log = [];
  for(let i = 0; i<exercises.length; i++){
    log.push({
      description: exercises[i].description,
      duration: exercises[i].duration, 
      date: exercises[i].date.toDateString()
    })
  }
  let response = {
    username: user.username,
    count,
    _id: user._id,
    log 
  }
  res.json(response);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});


