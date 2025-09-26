const db =require("../utils/databaseUtil");

module.exports = class Home{
  constructor(housename,price,location,rating,photo,descraption,id){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
    this.descraption=descraption;
    this.id=id;
  }
  save(){
    if(this.id){  //update
      return db.execute('UPDATE homes SET housename=?,price=?,location=?,rating=?,photo=?,descraption=? WHERE id=?',[this.housename, this.price,this.location,this.rating,this.photo,this.descraption,this.id]);
    }
    else{ // insert
    return db.execute('INSERT INTO homes (housename,price,location,rating,photo,descraption) VALUES(?,?,?,?,?,?)',[this.housename, this.price,this.location,this.rating,this.photo,this.descraption])
  }
  }
  
  static featchAll(){
  return  db.execute('SELECT * FROM homes');

  }

  //static home  find Byid method
  static findById(homeId,){
  return db.execute('SELECT * FROM homes WHERE id=?',[homeId]);
  }

  //static home  delete Byid 
  static deleteById(homeId,) {
    return db.execute('DELETE FROM homes WHERE id=?',[homeId]);
}


//   //static remove favourite 
  static removeFromFavourites(homeId, callback) {
  
}


};