const db =require("../utils/databaseUtil");

module.exports = class Home{
  constructor(housename,price,location,rating,photo,description,id){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
    this.description=description;
    this.id=id;
  }
  save(){
    return db.execute(`INSERT INTO homes (housename,price,location,rating,photo,description).VALUES('${this.housename}',${this.price} ,'${this.location}',${this.rating}, '${this.photo}','${this.description}')`)
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