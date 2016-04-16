
// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

var port = 8080;
var serverUrl = "127.0.0.1";
// 127.0.0.1  local
// 192.168.0.17 home wifi

 http = require("http");
 path = require("path");
 fs = require("fs");
 querystring = require("querystring");

var loadPages = require("./loadPages.js")

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {


  //if POST
  if (req.method.toLowerCase() === "post"){

    //TODO if image and if object (look at headers)
    //TODO move saveObject from master
    console.log("the first POST'ed file is: " + req.url);




    //store images
    // res.setHeader("Content-type", "image/jpeg")


    // res.setEncoding('binary')

    var imagedata = '';
    //TODO --saved image looks different than incoming data. saved image as text? unencode from base64?
    req.on("data", function(postBody){
      imagedata = imagedata + postBody;

      var decodedImage = new Buffer(imagedata, 'base64').toString('binary');

      console.log(decodedImage)
      fs.writeFile("imageData.jpeg", decodedImage, function(err){
            if (err){ throw err }
            // var decodedImage = new Buffer(base64Image, 'base64');

            res.end("Saved Image")
      })
    })








  //if GET
  } else {
      // console.log(req.method); // are there other methods I should be aware of?

    if (req.url.charAt(1) === "0" ){


      //TODO load image/object from file.
      // req.on("data", function(postBody){ postBody.toString()} // // do i need this?



      fs.readFile('imageData.txt',function(err, data){
        if (err){ throw err };

        res.setHeader("Content-type", "image/jpeg")
        // console.log(typeof data.toString());
        res.end(data.toString())
      })






      // res.setHeader("Content-type", "image/jpeg")
      // res.end("hey")




    } else {
      // console.log(__dirname + req.url)
      loadPages.doit(req, res);
    }
  }

}).listen(port, serverUrl);
