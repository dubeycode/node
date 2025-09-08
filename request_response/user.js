const http = require('http');
const fs =require('fs');
const server = http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);

  // first endpoint of url 
  if(req.url ==='/'){
  res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>MY first page</title></head>')
  res.write('<body><h1>Enter your Details </h1>');
  res.write('<form action="/submit-details" method="POST">');
  res.write('<input type="text" name="username" placeholder="Enter your name"></br>');
  res.write('<lable for="gender">gender:</lable>');
  res.write('<lable for="male">Male</lable>');
  res.write('<input type="radio" id="male" name="gender" value="male" />')
  res.write('<lable for="female">Female</lable>');
  res.write('<input type="radio" id="female" name="gender" value="female" />');
  res.write('<input type="submit" value="submit">');
  res.write('</form>')
  res.write('</body>')
  res.write('</html>');
  return res.end();
  } else if(req.url.toLowerCase() === "/submit-details" && req.method === "POST"){
   
    fs.writeFileSync('user.txt','satyam dubey');
    res.statusCode = 302;
    res.setHeader('Location','/')

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
