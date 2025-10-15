
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {dummyData} from "../Ex_mongoose/models/data.js"


let conn =await mongoose.connect("mongodb://localhost:27017/DummyData")

const app = express()
const port =3000

app.use(express.static(path.join(__dirname,'public','index.html')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.post('/', async (req,res)=>{
  const { name ,salary,language,city,is_Manager} =req.body
   const dummy = new dummyData({
     name,
    salary,
    language,
    city,
    is_Manager: is_Manager === 'on'
   });
   await dummy.save();
   res.send(`
    <h2>Data Saved Successfully!</h2>
    <a href="/">Go Back</a>
  `);
})


app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})