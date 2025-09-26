const db =require("../utils/databaseUtil");

module.exports = class Home{
  constructor(housename,price,location,rating,photo){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
  }
  save(){
    
   
  }

  static featchAll(){
  return  db.execute('SELECT * FROM homes');

  }

  //static home  find Byid method
  static findById(homeId,callback){
  
  }

  //static home  delete Byid 
  static deleteById(homeId, callback) {
  
}


//   //static remove favourite 
  static removeFromFavourites(homeId, callback) {
  
}


};