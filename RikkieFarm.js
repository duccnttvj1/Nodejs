const { readFileSync } = require('node:fs');
const http = require('node:http');

const fs = require("fs");
const { findSourceMap } = require('node:module');

const hostname = '127.0.0.1';
const port = 3007;

let overview = fs.readFileSync(`./templates/cart-template.html`,{encoding: "utf8"});
let product = fs.readFileSync("./templates/product.html",{encoding:"utf8"});

let data = fs.readFileSync('./dev-data/data.json',{encoding: "utf8"});
let obj = JSON.parse(data);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf8');

  let update  = overview;
  let updateProduct = product;

  obj.forEach(element => {
      update = update.replace(/{{productName}}/g,element["productName"]);
      update = update.replace(/{{image}}/g,element["image"]);
      update = update.replace(/{{quantity}}/g,element["quantity"]);
      update = update.replace(/{{price}}/g,element["price"]);
      update = update.replace(/{{id}}/g,element["id"]);
  });

  if(req.url === "/" || req.url === "/overview"){
    res.end(update);
  }else if(req.url.startsWith('/product/')){
    let urlArr = req.url.split("/");
    let id = urlArr[urlArr.length-1];
    
    let item = obj.find(o => String(o.id) === id);
    updateProduct = updateProduct.replace(/{{productName}}/g,item["productName"]);
    updateProduct = updateProduct.replace(/{{image}}/g,item["image"]);
    updateProduct = updateProduct.replace(/{{quantity}}/g,item["quantity"]);
    updateProduct = updateProduct.replace(/{{price}}/g,item["price"]);
    updateProduct = updateProduct.replace(/{{id}}/g,item["id"]);
    updateProduct = updateProduct.replace(/{{from}}/g,item["from"]);
    updateProduct = updateProduct.replace(/{{nutrients}}/g,item["nutrients"]);
    updateProduct = updateProduct.replace(/{{description}}/g,item["description"]);
    updateProduct = updateProduct.replace(/{{organic}}/g,item["organic"]);

    if(item){
      res.end(updateProduct);
    }else{
      console.log("NOT FOUND");
    }
  }
});

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});