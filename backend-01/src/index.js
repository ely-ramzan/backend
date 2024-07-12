
// ******************************************express()

// const express = require('express')
// const app = express()
// const port = 3030

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/about', (req,res) => {
//     res.send("<h1>I am in about page</h1>")
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })






//****************************EventEmmiter:

// const EventEmitter =  require('events');
// // const e = require('express');
// const emitter = new EventEmitter();

// emitter.on("messageLog",(args) => {
//   console.log("Hi you are live");
//   console.log(args);
// })

// emitter.emit("messageLog",{id: 23232,name:"ali"});

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on("messageLog",(args) => {
//   console.log("Hi you are live");
//   console.log(args);
// })

// logger.log("message");


// ******************************** http

// const http = require('http');

// const server = http.createServer();

// server.on("connection",(socket) => {
//   console.log("new connection");
// })
// server.listen(3300)

// ********************************************* createServer()

// const http = require('http');

// const server = http.createServer(
//   (req , res) => {
//     if(req.url === '/'){
//       res.write("Hello world /");
//       res.end()
//     } else if (req.url === '/api/courses') {
//       res.write(JSON.stringify([1,2,3]));
//       res.end()
//     }
//   }
// );

// server.on("connection",(socket) => {
//     console.log("new connection ");
//   })


// server.listen(3300)



// *********************************** express :

import express from 'express';
import Joi from 'joi';
import 'dotenv/config';

const app = express();
app.use(express.json())
const port = parseInt(process.env.PORT) || 3030;

// console.log();

app.get(
  "/" , (req,res) => {
    res.send("Hi you are live")
  }
)

app.get(
  "/about" , (req,res) => {
    res.send("<h1>live at about<h1/>")
  }
)

const courses = [{id : 1, name : "course 1"},
                {id : 2, name : "course 2"},
                {id : 3, name : "course 3"},
                {id : 4, name : "course 4"}]
                
app.get(
  "/api/courses", (req,res) => {
    res.send(courses);
  }
)

app.get(
  "/api/courses/:id", (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`<h1>Could not find ${req.params.id}</h1>`);
    res.send(course);
  }
)

function validateInput (input) {
  const schemas = Joi.object({
    name: Joi.string().min(3).max(20).required()
  });
  return schemas.validate(input);
}

app.post("/api/courses",(req,res) => {
  
  const { error } = validateInput(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id : courses.length + 1,
    name : req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put("/api/courses/:id" , (req,res) => {
  // check if id exists:
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send(`<h1>Could not find ${req.params.id}</h1>`);

  // check if obj is valid:
  const { error } = validateInput(req.body);
  if(error) return res.status(400).send(error.details[0].message);
    
  // update and send :
  course.name = req.body.name;
  res.send(course);
})

app.delete("/api/courses/:id",(req,res) => {
  // check if id exists:
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send(`<h1>Could not find ${req.params.id}</h1>`);

  // deleting logic:
  const index = courses.indexOf(course);
  courses.splice(index,1);

  // return same course:
  res.send(course);
})

app.listen(port,() => {
  console.log(`listening on ${port}`);
})

