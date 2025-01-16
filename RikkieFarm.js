const { readFileSync } = require('node:fs');
const http = require('node:http');

const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3006;

let overview = fs.readFileSync(`./templates/overview.html`,{encoding: "utf8"});

let data = fs.readFileSync('./dev-data/data.json',{encoding: "utf8"});
let obj = JSON.parse(data);

obj.forEach(element => {
    let update  = overview;

    update = update.replace(/{{productName}}/g,element.productName);
    update = update.replace(/{{image1}}/g,element.image);
    update = update.replace(/{{quantity}}/g,element.quantity);
    update = update.replace(/{{price}}/g,element.price);
    update = update.replace(/{{id}}/g,element.id);
});

let product = fs.readFileSync("./templates/product.html",{encoding:"utf8"});




const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if(req === "/" || req === "/overview"){
    res.end(overview);
  }else if(req ===  "/product/id"){
    res.end(product);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running on .......`);
});