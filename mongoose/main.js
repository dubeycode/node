import mongoose from "mongoose";
import express from "express";
import { Todo } from "../mongoose/models/Todo.js";


let conn = await mongoose.connect("mongodb://localhost:27017/todo")

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const todo =new Todo({title:"coding full night",desc:"full night without any intraption", isDone:false})
  todo.save()
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(` http://localhost:${port}`)
})