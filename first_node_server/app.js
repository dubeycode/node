// ################## way 01 #######################
// const http = require('http');

// const server =http.createServer((req,res)=>{
//   console.log(req);
// });
// server.listen(3000);




//################  method 2 some prityfy ##################

const http = require('http');


const server =http.createServer((req,res)=>{
  console.log(req);
  process.exit();
});

const PORT= 3001;

server.listen(PORT,()=>{
  console.log(`server is runinng at http://localhost:${PORT}`)
});




