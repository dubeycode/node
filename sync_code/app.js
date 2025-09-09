const http = require('http');
const  RequestHandler = require('./user');

const server =http.createServer(RequestHandler);

const PORT =3001;
server.listen(PORT,()=>{
  console.log(`server is runiing on address http://localhost:${PORT}`);
});