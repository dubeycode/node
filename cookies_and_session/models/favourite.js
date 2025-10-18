const mongoos =require('mongoose');

const favouriteSchema =mongoos.Schema({
  houseId:{
    type:mongoos.Schema.Types.ObjectId,
    ref:'Home',
    require:true,
    unique:true
  }
})

module.exports = mongoos.model('Favourite',favouriteSchema);

