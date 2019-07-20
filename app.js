const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const config = require('./src/config')
const Controllers = require('./src/Controllers');


config.init();

Controllers.init(app);

// const mongoose = require('mongoose');

// const schemaPerson = new mongoose.Schema({
//   name: String,
// });

// const Persona = mongoose.model('Persona', schemaPerson);

// app.use(bodyParser.json())

// const middleware = (req,res,next) => {
//   setTimeout(()=> {
//    req.hola = "Aloha"
//    next()
//   }, 3000) 
//  }
 
 //app.use(middleware);

 app.get('/', (req, res) => {
  // const jose = new Persona();
  // jose.name = 'Jose';
  // jose.save();

  // res.send(req.hola);
  res.send("Test")
});

app.listen(3000);


