function loadImage(){

  var abc = new XMLHttpRequest();
  abc.onreadystatechange =  function(){
    if (abc.readyState == 4 && abc.status == 200) {
      //TODO bug --Image corrupt or truncated. URI in this note truncated due to length. (header: Content-Length?)
      var h = abc.responseText
      $(".added").append("<img src='data:image/jpeg;base64,/9j/"+ h +"'/>")
      console.log(abc.responseText);
    }
    console.log(abc.readyState)
  }

  abc.open("GET", "http://localhost:8080/" + Math.random(), true);

  //dont know if i need this
  // abc.setRequestHeader("Content-type", 'Content-Encoding: gzip');


  abc.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  abc.send();
}

$(function(){
  //simple test object x
  var x = {
    "key": "value",
  }

  //test image y
  y = $("#piece1").attr("src");


  $("#saveImage").click(function(){

    // //TODO bug --duplicate,(sometimes empty) image. caused by getDataUri running callback twice?
    // $(".added").append("<img src='img/cat4.jpeg'>")

    //save image
    getDataUri(y, function(dataUri){
      saveMyImage(dataUri);
      console.log(dataUri)
    })
    //save image info
    // TODO server side for object
    // saveMyObject(x);

  })

  $("#loadImage").click(function(){
    loadImage()
  })

})

function saveMyImage(objt) {

  //send image url

  //TODO retrieve image url, output pic to dom


  var abc = new XMLHttpRequest();

  abc.onreadystatechange =  function(){
    if (abc.readyState == 4 && abc.status == 200) {
      //TODO bug --Image corrupt or truncated. URI in this note truncated due to length. (header: Content-Length?)
      $(".added").append("<p>"+ abc.responseText +"</p>")
      console.log(abc.responseText);
    }
    console.log(abc.readyState)
  }

  abc.open("POST", "http://localhost:8080/" + Math.random(), true);
  abc.setRequestHeader("Content-type", 'Content-Encoding: gzip');
  abc.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  abc.send(objt);

}


function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}


function saveMyObject(objt) {

  var outString = JSON.stringify(objt);
  console.log(outString)

  var abc = new XMLHttpRequest();

  abc.onreadystatechange =  function(){
    if (abc.readyState == 4 && abc.status == 200) {
      console.log(JSON.parse(abc.responseText));
    }
    console.log(abc.readyState)
  }

  abc.open("POST", "http://localhost:8080/" + Math.random(), true);
  abc.setRequestHeader("Content-type", "application/json");

  abc.send(outString);

}
