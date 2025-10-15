import mongoose from "mongoose";

const  dummySchema = new mongoose.Schema({
  Name:String,
  salary:Number,
  language:String,
  city:String,
  isManager:Boolean
})

export const  dummyData =mongoose.model('dummy',dummySchema)
