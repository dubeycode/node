
const {sumRequestHandler} = require('./sum')
const  requestHandler =(req,res)=>{
  console.log(req.url,req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<h3>Welcome to calculator! Use it & boost your productivity</h3>');
    res.write('<a href="/calculator">Go to Calculator</a>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  else if (req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head><title>calculator</title></head>
        <body>
          <h1>Here is the calculator </h1>
          <form action="/calculator-result" method="POST">
            <input type="text" name="first" placeholder="enter first number">
            <input type="text" name="second" placeholder="enter second number">
            <input type="submit" value="sum">
          </form>
        </body>
        </html>
      `);
      return res.end();
  }

    else if (req.url.toLowerCase() === '/calculator-result' && req.method === 'POST') { 
    return sumRequestHandler(req, res);
  }

  // default 404

  res.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 </title>
</head>
<body>
  <center>404 page not found</center>
  <center><a href="/">go to Hme</a></center>
</body>
</html>
    `)
    res.end();
}

exports.requestHandler =requestHandler




