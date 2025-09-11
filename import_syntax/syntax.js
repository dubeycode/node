const testingSyntax = ()=>{
  console.log('I am inside testing syntax');  
  console.log(__dirname,__filename)   // these two thing we can collect by default without declares
};


module.exports=testingSyntax;