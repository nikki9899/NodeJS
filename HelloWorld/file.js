const fs = require("fs");

//synchronous call
// fs.writeFileSync('./test.txt','hey there');


//asynchronous
// fs.writeFileSync('./test.txt','hey there async',(err)=>{});

// const result=fs.readFileSync("./contacts.txt","utf-8");
// console.log(result)


// fs.readFile("./contacts.txt",'utf-8',(err,result)=>{
//     if(err){
//         console.log("error",err);
//     }else {
//         console.log(result);
//     }
// })


fs.appendFileSync("./test.txt",`${Date.now()}hey there\n` );

fs.cpSync("./test.txt","./copy.txt");


//delete
// fs.unlinkSync("./copy.txt")

console.log(fs.statSync("./test.txt"))


