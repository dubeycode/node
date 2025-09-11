const fs = require("fs");
const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  //end point
  if (req.url === "/contact") {
    req.write(`
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>contact</title>
      </head>
      <body>
        
      </body>
      </html>
      `);
  }
};

module.exports = userRequestHandler