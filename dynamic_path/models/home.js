const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const Favourite = require('./favourite');
const HomeDataPath =path.join(rootDir,'data' ,'homes.json');



module.exports = class Home{
  constructor(housename,price,location,rating,photo){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
  }
  save(){
    
    Home.featchAll((registerHome)=>{
        if(this.id){  // edit home case 
          registerHome=registerHome.map(home=>{
            if(home.id === this.id){
              return this;
            }
            return home;
          })
    }else{ // new home add  case 
      this.id=Math.random().toString();
      registerHome.push(this);
    }
    
    fs.writeFile(HomeDataPath,JSON.stringify(registerHome),error =>{
      console.log(error)
    })
    })
   
  }

  static featchAll(callback){
    const homeDataPath = path.join(rootDir,'data','homes.json');
    fs.readFile(homeDataPath,(err,data)=>{
      // console.log("file read",err,data);
      callback(!err ? JSON.parse(data):[]);
    });
  }

  //static home  find Byid method
  static findById(homeId,callback){
    this.featchAll(homes=>{
    const homeFound =  homes.find(homes =>homes.id === homeId);
    callback(homeFound);
    })
  }

  //static home  delete Byid 
  static deleteById(homeId, callback) {
  this.featchAll(homes => {
    homes = homes.filter(home => home.id !== homeId);

    fs.writeFile(HomeDataPath, JSON.stringify(homes), (err) => {
      if (err) {
        console.error("Error deleting home:", err);
        return;
      }
      callback();
    });
  });
}


//   //static remove favourite 
  static removeFromFavourites(homeId, callback) {
  Favourite.getFavourite(homeIds => {
    homeIds = homeIds.filter(home => home.id !== homeId);
    fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), (err) => {
      if (err) {
        console.error("Error deleting home:", err);
        return;
      }
      callback();
    });
  });
}


};