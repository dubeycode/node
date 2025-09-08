const http = require('http');
const server = http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);

  // first endpoint of url 
  if(req.url ==='/'){
  res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>MY first page</title></head>')
  res.write('<body><h1> Welcome to shop  </h1><body>')
  res.write('</html>');
  return res.end();
    // second endpoint of url 
  }else if(req.url === '/products'){
  res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>products</title></head>')
  res.write('<body><h1> product section</h1> </br> product loding wait....<body>')
  res.write('</html>');
  return res.end();
  }
    // default endpoint of url 
  res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>MY first page</title></head>')
  res.write('<body><h1> Welcome  </h1><body>')
  res.write('</html>');
  res.end();
  
});

// defind the fort number 
const PORT= 3001;

// server listen and give the port number dynamically
server.listen(PORT,()=>{
  console.log(`server is runinng at http://localhost:${PORT}`)
});
