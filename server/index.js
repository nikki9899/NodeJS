const http = require("http");
// const fs = require("fs");
// const url = require("url");


const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    return res.send("hello from home page");
});

app.get("/about",(req,res)=>{
    return res.send("hello from about page"+"hey"+req.query.name+"you are"+req.query.age)
});


// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.method} ${req.url}New Req Recived\n`;
//   const myUrl = url.parse(req.url, true);
//   console.log("myurl",myUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("Home Page");

//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`hi,${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end("here" + search);

//       case "/signup":
//         if (req.method === "GET") res.end("this is a signup form");
//         else if (req.method === "POST") {
//           res.end("success");
//         }
//       default:
//         res.end("404 not found");
//     }
//   });
// }

app.listen(8000,()=>console.log("server started"));

// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("server started");
// });
