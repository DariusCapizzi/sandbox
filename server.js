
// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

var port = 8080;
var serverUrl = "127.0.0.1";


 http = require("http");
 path = require("path");
 fs = require("fs");
 querystring = require("querystring");

var loadPages = require("./loadPages.js")

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {

  if (req.method.toLowerCase() === "post"){
    console.log(req.url);
    req.on("data", function(postBody){
      res.setHeader("Content-type", "application/json")
      
      var inObjt = JSON.parse(postBody.toString());
      console.log(typeof objt)


      var outObjt = JSON.stringify(inObjt)
      // console.log(typeof objt2)




      res.end(outObjt)
    })

  } else {
    // console.log(req.method);
    loadPages.doit(req, res);
  }
}).listen(port, serverUrl);
