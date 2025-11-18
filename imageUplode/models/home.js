
const mongoose =require('mongoose');
// const favourite =require('./favourite')

// _id is automatically added by mongoose
const homeSchema =new mongoose.Schema({
  housename:{type:String,require:true},
  price:{type:Number,require:true},
  location:{type:String,require:true},
  rating:{type:Number,require:true},
  photo:String,
  descraption:String
})


// homeSchema.pre('findOneAndDelete', async function(next){
//   console.log('came to pre hook and delet the home ');
//   const homeId =this.getQuery()._id;
//   await favourite.deleteMany({houseId:homeId});
//   next();
// })


module.exports=mongoose.model('Home',homeSchema);

