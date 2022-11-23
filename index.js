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
    let user_id = req.params._id;
    let user = await User.findById(user_id);
    console.log(user)
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
