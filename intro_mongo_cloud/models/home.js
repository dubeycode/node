
const { ObjectId } = require('mongodb');
const {getDB} = require('../utils/databaseUtil');

module.exports = class Home{
  constructor(housename,price,location,rating,photo,descraption,_id){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
    this.descraption=descraption;
    if(_id){
    this._id=_id;
    }
  }
  save(){
    const db = getDB();
    if(this._id){ //update
      const updateFiels ={
      housename: this.housename,
      price:this.price,
      tlocation:this.location,
      trating:this.rating,
      photo:this.photo,
      descraption:this.descraption
      }

       return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set:updateFiels})
    }else{
      return db.collection('homes').insertOne(this);
    }
   
  }
  
  static featchAll(){
  const db =getDB();
  return db.collection('homes').find().toArray()
  }

  //static home  find Byid method
  static findById(homeId,){
    console.log(homeId)
    const db =getDB();
    return db.collection('homes').find({_id:new ObjectId(String(homeId))}).next();
  }

  //static home  delete Byid 
  static deleteById(homeId,) {
    console.log(homeId)
    const db =getDB();
    return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId))})
}


//   //static remove favourite 
  static removeFromFavourites(homeId, callback) {
  
}
};