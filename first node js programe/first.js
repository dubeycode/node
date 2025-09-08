console.log("dubey is best");

const fs =require('fs');

fs.writeFile("output.txt","hello dubey you are the best boy",(err)=>{
  if (err) console.log("error occured");
  else console.log("file written sucessfully");
});