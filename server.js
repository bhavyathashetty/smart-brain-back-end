const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/Image')

const db = knex({
  
  client: 'pg',
  connection: {
    host : '127.0.0.1',
   
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleapicall(req,res)})

app.listen(process.env.PORT||3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})