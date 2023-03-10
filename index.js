require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const StudentModel = require('./models/Student');
const cors = require('cors');

const port =process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://hatem:education123@cluster1.dsmfshy.mongodb.net/education1?retryWrites=true&w=majority");

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err)=>{
    console.log(err);
});


app.post("/create", async (req, res) =>{
   const user = req.body;
   const newUser = new StudentModel(user);
   await newUser.save();
   res.json(user)
});


app.get("/get", async (req, res) => {
    try {
      const students = await StudentModel.find({ });
      res.send(students);
    } catch (err) {
      console.log(err);
    }
  });



app.listen(port,() => {
    console.log('SERVER RUNS PERFECTLY');
})