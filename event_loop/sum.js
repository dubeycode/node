const sumRequestHandler =(req,res)=>{
  console.log("1 .In sum Request Hanbler",req.url);
  const body=[];
  let result ;
  req.on('data',chunk=> {
    body.push(chunk);
    console.log(" 2. chunk came");
  });
  req.on('end',()=> {
    console.log("3. end vent came ")
    const bodyStr = Buffer.concat(body).toString();
    console.log(bodyStr)
    const params =new URLSearchParams(bodyStr);
    const bodyObj=Object.fromEntries(params);
    console.log(bodyObj)
    result =Number(bodyObj.first)+Number(bodyObj.second);
    console.log(result)
  });
  console.log("4. sending the result")
    res.setHeader('content-Type','text/html')
    res.write(`
      <html>
        <head><title>calculator</title></head>
        <body>
          <h1>Your sum is ${result}</h1>
        </body>
        </html>
      `);
      return res.end();

}
exports.sumRequestHandler = sumRequestHandler;