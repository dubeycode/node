const http =require('http');
const server =http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);
  if(req.url==='/home'){
    res.write('<p>This is home page of myntra</p>');
    return res.end();
  }
  else if(req.url==='/man'){
    res.write('<p>Men section </p>');
    return res.end();
  }
  else if(req.url==='/woman'){
    res.write('<p>All product of women </p>');
    return res.end();
  }
  else if(req.url==='/kid'){
    res.write('<p>Kid section </p>');
    return res.end();
  }
  else if(req.url==='/cart'){
    res.write('<p>This is cart section </br> ready to cheekout......</p>');
    return res.end();
  }
 res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>myntra</title></head>')
  res.write('<body>');
  res.write('<nav>');
  res.write('<ul>');
  res.write("<li><a href='/home'>Home</a></li>")
  res.write("<li><a href='/man'>Man</a></li>")
  res.write("<li><a href='/woman'>Woman</a></li>")
  res.write("<li><a href='/kid'>Kid</a></li>")
  res.write("<li><a href='/cart'>Cart</a></li>")
  res.write('</ul>');
   res.write('</nav>');
  res.write('</body>');
  res.write('</html>');
  
})



const PORT=3001;
server.listen(PORT,()=>{
  console.log(`server is runing at http://localhost:${PORT}`)
});