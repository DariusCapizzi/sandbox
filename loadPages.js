// function loadPage(x){ console.log(x.url)};


function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

function loadPage(req, res){
  var filename = req.url;
  if (filename === "/"){
    filename += "index.html";
  }

  var ext = path.extname(filename);

  var localPath = __dirname;
  var validExtensions = {
    ".html" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png"
  };
  var isValidExt = validExtensions[ext];
  if (isValidExt) {

    localPath += filename;
    fs.exists(localPath, function(exists) {
      if(exists) {
        console.log("Serving file: " + localPath);
        getFile(localPath, res, isValidExt);
      } else {
        console.log("File not found: " + localPath);
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    // console.log(filename)
    console.log("Invalid file type: " + ext)
  }
}



module.exports.doit = loadPage;
