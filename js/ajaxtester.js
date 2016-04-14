function load() {
  var abc = new XMLHttpRequest({mozSystem: true});
  abc.onreadystatechange =  function(){
    if (abc.readyState == 4 && abc.status == 200) {

      console.log(abc.responseText)
    }

  }

  abc.open("GET", "http://localhost:8080/" + Math.random(), true);
  abc.send();

}


console.log("hey")
// $(function(){
//   load();
//
// })
