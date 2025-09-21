const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');


module.exports = class Home{
  constructor(housename,price,location,rating,photo){
    this.housename=housename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
  }
  save(){
    this.id=Math.random().toString();
    Home.featchAll((registerHome)=>{
    registerHome.push(this);
    const HomeDataPath =path.join(rootDir,'data' ,'homes.json');
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
}