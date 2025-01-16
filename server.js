//EX01:
const fs = require("fs");
const { readFileSync } = require("node:fs");

// let readFile = fs.readFileSync("./txt/read-this.txt",{encoding: "utf8"});

// console.log(readFile);

// let input = fs.readFileSync("./txt/input.txt", {encoding: "utf8"});

// console.log(input);

// let append = fs.readFileSync("./txt/append.txt", {encoding: "utf8"});

// console.log(append);

// let final = fs.writeFileSync("./txt/final.txt",input+append,{encoding: "utf8"});

//EX02
//Bất đồng bộ

fs.readFile("./txt/read-this.txt","utf8",(err,data)=>{
    if(err){
        console.log(`Error reading file:`,err);
        return;
    }else{
        console.log(`File content:`,data);
    }
});

fs.readFile("./txt/input.txt","utf8",(err,data1)=>{
    if(err){
        console.log(`Error reading file:`,err);
        return;
    }else{
        console.log(`File content:`,data1);
    }
    fs.readFile("./txt/append.txt","utf8",(err,data2)=>{
        if(err){
            console.log(`Error reading file:`,err);
            return;
        }else{
            console.log(`File content:`,data2);
        }
        fs.writeFile("./txt/final.txt",`${data1}<br>${data2}</br>`,"utf8",(err)=>{
            if(err){
                console.log("Error reading file:",err);
                return;
            }else{
                console.log("File has been written");
            }
        });
    });
});
// readFileSync là đông bộ
// readFile là bất đồng bộ
// bất đồng bộ thì là non-blocking sẽ thực thi các dòng lệnh bên dưới mà không cần đợi hàm hoàn thành
// Khi hoàn thành hàm sẽ sử dụng chức năng callback để thông báo 

//Ex3 Từ Exercise 01 và 02, tìm hiểu thế nào là blocking và non-blocking, cơ chế bất đồng bộ (Asynchronous) của Node.js
// readFileSync là đông bộ
// readFile là bất đồng bộ
// bất đồng bộ thì là non-blocking sẽ thực thi các dòng lệnh bên dưới mà không cần đợi hàm hoàn thành
// Khi hoàn thành hàm sẽ sử dụng chức năng callback để thông báo 

//EX4
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

let output = fs.readFileSync('./txt/final.txt',{encoding: "utf8"});

//EX6

fs.readFile("./dev-data/data.json","utf8",(err,data)=>{
    if(err){
        console.log("Error when reading file");
        return;
    }else{
        console.log(data);
    }
});

let object = fs.readFileSync("./dev-data/data.json",{encoding: "utf8"});

let obj = JSON.parse(object);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf8');
//   res.end(output); của EX4
//Phần dưới đây là của EX5
//   if(req.url === '/'){
//     res.end("<h1>This is homepage</h1>");
//   }else if(req.url === '/overview'){
//     res.end("<h1>This is overview page</h1>");
//   }else if(req.url === '/product'){
//     res.end("<h1>This is product page</h1>");
//   }else if(req.url === '/api'){   // EX6
//     res.end(JSON.stringify(obj)); // EX6
//   }else if(req.url === '/api/'){  // EX6

//     let urlParts = req.url.split('/');
//     let idd = parseInt(urlParts[urlParts.length-1]);

//     let item  = obj.find(o => o.id === idd);
//     if(item){
//         res.end(JSON.stringify(item));
//     }else{
//         console.log("Object NOT FOUND");  // EX6
//     }
//   }else{
//     res.end("<h1>PAGE NOT FOUND</h1>");
//   }
//EX07
     let overview = readFileSync("./templates/overview.html",{encoding:"utf8"});
     let product = readFileSync("./templates/product.html",{encoding:"utf8"});
     if(req.url === "/"){
        res.end(overview);
     }else if(req.url === "/overview"){
        res.end(overview);
     }else if(req.url === "/product"){
        res.end(product);
     }
});

server.listen(port, hostname, () => {
  console.log(`Server running on ....`);
});

//EX5 Xử lý ở trên










