const mongo = require('mongodb')

const MongoClient = mongo.MongoClient;

const MONGO_URL ="mongodb+srv://dubey_dbuser:backendPassword@completairbnb.idrzuwa.mongodb.net/?retryWrites=true&w=majority&appName=completairbnb"


let _db;


const mongoConnect =(callback)=>{
  MongoClient.connect(MONGO_URL).then((client)=>{
    callback();
    _db =client.db('airbnb')
  })
  .catch((err)=>{
    console.log("Error while connecting to mongo:",err);
  });
}

const getDB =() =>{
  if(!_db){
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoConnect=mongoConnect;
exports.getDB = getDB;