const { createServer } = require('node:http');
const fs =require("fs");

const hostname = '127.0.0.1';
const port = 3008;


const server = createServer((req, res) => {
  let readThis = fs.readFileSync("./txt/read-this.txt", {encoding: "utf8"});
  console.log(readThis);

  if(req.url === "/"){

  }else if(req.url === "/overview"){

  }else if(req.url === "/product"){

  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});