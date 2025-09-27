const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const favouriteDataPath =path.join(rootDir,'data' ,'favourite.json');


module.exports = class Favourite{
  
  static addToFavourite(homeId,callback){
       Favourite.getFavourite((favourites)=>{
        if(favourites.includes(homeId)){
          callback("Home is already marked favourite")
        }else{
          favourites.push(homeId);
            fs.writeFile(favouriteDataPath,JSON.stringify(favourites),callback);
        } 
        });
  }

  static getFavourite(callback){
    fs.readFile(favouriteDataPath,(err,data)=>{
      callback(!err ? JSON.parse(data):[])
    });
  }

  static deleteById(homeId, callback) {
    Favourite.getFavourite((favourites) => {
      const updatedFavs = favourites.filter((id) => id !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(updatedFavs), (err) => {
        if (err) {
          console.error("Error deleting home:", err);
          return;
        }
        callback();
      });
    });
  }
}