//Global Object ==> window {It was given to us by browser}
//console.log(global);global === globalThis
// console.log(this);this and gloabl are not same in node.
//Modules protect their variables and functions from their leaking.{can be done by using export and import}

//Without export if we only write require we cannot access variables and methods.

//Common JS modules               ||  ES Modules{In package.json if we keep type:"module" then it becomes like es module}
//module.exports,require          ||   export,import

//require
const obj=require('./xyz.js')//If we dont write .js extension then also it works properly only.
console.log(obj.a)
console.log(obj.sum(1,2))
//console.log(globalThis);



//Video-5:
//require(/path)
//  1.Resolving the module 
//   -->/localpath
//   -->.json     -->node:module
//  2.Loading the module
//  file content is loaded
//  3.Wraps inside IIFE (Immediately invoked file expression){compile step}
//  4.Evaluation
//  5.Catching


//Video-6
//Nodejs has a event driven architecture and capable of asynchronous I/O.
//Javascript is a synchronous single threaded language.

////LIBUV {It is like a queen in chess game where as v8 js engine is a king}
//LIBUV ==>asynchronous I/O made simple.
//  V8 ==> LIBUV ==> OS.

//Video-7
//Dont use synchronous methods because they block main thread.
//setTimeout(()=>{},0)
//setTimeout(()=>{},2000)
//setTimeout is an async function once it had entered into libuv after v8 engine's call stack empty only it come into v8engines call stack.


//Video-8
//Code  Step-1:Lexical analysis/Tokenization{code broken down into tokens}
//Step-2:Syntax analysis/Parsing {Abstract syntax tree is generated}
//If our code does not generate abstract syntax tree then we get syntax error.
//Is javascript interpreted or compiled language{It uses both interpreted and compiled} JS is JIT[Just in time] compilation
//Google's v8 engine has ignition interpreter
//                  ____Turbofan conpiler -->Optimisedcode___{Optimisation}
//                 |                                         |
//AST --> Ignition interpreter -->     Byte code     -->   execution  ====>Interpilation
//Once see screenshot to understand clearly
//Learn about inline caching and copy elusion


//Video-9 {LIBUV}
//Asynchronous and Non blocking I/O is because of LIBUV.
//Event loop is present in libuv the job of eventloop is to check call stack in v8 engine and call back queue in libuv.
//Event loop screenshot
//Please get clarification in event loop using chatgpt

//Video-10  ==>Thread pool{Whenever we used pool options[fs,crypto] then thread pool is called}
//Is node js single threaded or multi threaded.
//If we are giving only synchronous code then javascript is single threaded and whenever we are using pool then it is multithreaded
//Based on the situation we can say it is single or multi threaded
//Thread pool size is 4 by default
//we can change thread pool size with the help of "process.env.UV_THREADPOOL_SIZE = 1110{How many threads we require that many we can assign}"
//Timers queue uses heap data structure.
//

console.log("10 videos completed")
//Video-11  Creating a server
//Server
//Client-Server architecture
//IP   +   PORT NUMBER    +    PATH     <======>   API

//Video-12 Database
//RDBMS {MySQL,POSTGRESQL}
//EF CODD ===>  12 rules

//Database ==> The place where we store data in organized and in structured format.
//NoSQL[Not only SQL] ==> {DocumentDB,KeyValueDB,GraphDB,Multimodel DB,MongoDB}
//MongoDB  ==>It was developed by company 10gen
//No table only Collection
//No row only Document{Document contains fields}
//No attributes only fields
//No joins and No normalization.
//Differences between RDBMS and NoSQL  ==>  Screenshot.

//Video-13
//npm is a place where a lot of packages are there.
 
console.log("Season-2")

//Season-2
//Step-1 {npm init}
//Step-2 Create app.js in src {Starting point of our application}
//Step-3 npm i express
//Step-4 sudo npm i -g nodemon
//Difference between caret and tilde ?


//Order or routes is very important{Top to bottom}

//http methods{GET,POST,PUT,PATCH,DELETE}
//Install postman app
//"/ab?c" {Here b is optional}{+ one or more b's}{* anything between b and c}
//req.query and req.params

//Middlewares and error handling
//append.use("/user",(req,res)=>{})It can be handled all requests whether it is get,post,put,patch or delete.
//in app.use() (reg,res,next)=>{} ==>This is route handler,There can be multiple route handlers also.
//If first route handler has empty implementaion then express cant move to next route handler once if we keep "next()" in first route handler then it will move to second route handler.
//We can also send array of route handler functions.
//app.post(),app.get().............

//Why we need multiple route handlers ==> Reason is middlewares.
//Difference between app.use() and app.all()?

//Error handling
//throw new Error("");
//Best practice is use try catch
//try{}catch(){}
//app.use("/",(err,req,res,next)=>{}) ==>Order is very important.

//Database
//npm i mongoose.
//JSON is different from Javascript object.
//DAtabase validations
//API level validations

//npm i validator

//npm i bcrypt


//Very very important topics 
//JWT
//If user wants to communicate with server then TCP/IP protocol is used.
//npm i cookie-parser


console.log("Project started")

//express.router ==>It is used to manage api's efficiently and we will group our api's into different type of routers.





