import http from 'http'
// const http =require('http')
// const testingSyntax =require('./syntax');
// const runtime = require('./runtime');
import {runtime} from "./runtime.js";

const server = http.createServer((req,res)=>{
  console.log(req.url,req.method);
  // testingSyntax();
  runtime();
});

const PORT=3001;
server.listen(PORT,()=>{
  console.log(`server is runing on address http://localhost:${PORT}`);
});