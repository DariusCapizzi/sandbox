function loadMy2(objt) {

  console.log(objt)

  var abc = new XMLHttpRequest();

  abc.onreadystatechange =  function(){
    if (abc.readyState == 4 && abc.status == 200) {
      console.log(JSON.parse(abc.responseText));
    }
    console.log(abc.readyState)
  }

  abc.open("POST", "http://localhost:8080/" + Math.random(), true);
  abc.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');

  abc.send("imgDate=" + objt);

}

$(function(){
  var x = {
    "key": "value",
  }
  loadMy(x);

  var y = ""
  $("#saveImage").click(function(){
    previewFiles()
    // loadMy2(y)
  })
})

function previewFiles() {

  var preview = document.querySelector('#yourImage');
  var files   = document.querySelector('input[type=file]').files;


  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        preview.appendChild( image );
        console.log(this.result)
        y = this.result
      }, false);

      reader.readAsDataURL(file);
    }

  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }

}

function loadMy(objt) {

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
