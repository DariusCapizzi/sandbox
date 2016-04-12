function Piece(pieceName, img, currentPos, relativePos, neighbors) {
  this.pieceName = pieceName;
  this.img = img;
  this.currentPos = currentPos;
  this.relativePos = relativePos;
  this.neighbors = {};
}

Piece.prototype.checkPosition = function() {
  
  for (var i in this.neighbors){
    // check if position is within 20px of any neighbor
    if (Math.abs((this.neighbors[i].currentPos[0] - this.currentPos[0]) - (this.neighbors[i].relativePos[0] - this.relativePos[0])) < 100
  && Math.abs((this.neighbors[i].currentPos[1] - this.currentPos[1]) - (this.neighbors[i].relativePos[1] - this.relativePos[1])) < 100) {
      // change position to sit alongside neighbor
      this.currentPos[0] = this.neighbors[i].currentPos[0] + this.relativePos[0] - this.neighbors[i].relativePos[0];
      this.currentPos[1] = this.neighbors[i].currentPos[1] + this.relativePos[1] - this.neighbors[i].relativePos[1];

      //adding return true for testing success.
      return true;
    } else { return false; }
  };
}




// // create new Piece objects
// var cat1 = new Piece("cat1", "cat1.jpg", [10,50], [0,0]);

// // set object relations
// cat1.neighbors = {cat2, cat3};

// set object of Piece objects
// var pieces = {cat1, cat2, cat3, cat4};



var pieces = {};


$(function() {
  //add user images to pieces
  $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var randomBumber = Math.floor(Math.random() * (1000))
                $("body").append("<img src=' "+ e.target.result +" ' class='new-piece' id='" + randomBumber + " ' />");
                $(".new-piece").draggable();
            };

            reader.readAsDataURL(this.files[0]);
        }
  });


  // on new-piece drag
  $(".new-piece").draggable();

  //set puzzle
  $("#setPiece").click(function(){

    //for each new image, make object,
    $(".new-piece").each(function() {
      var id = $(this).attr("id");
      var newPiece = new Piece(id, $(this).attr("src"), [0,0], [parseInt($(this).css("left")), parseInt($(this).css("top"))]);
      pieces[id] = newPiece;
      $(this).remove();
    })

    //set neighbors

    for (var k in pieces) { // for every object in pieces
      for (var kk in pieces) { // for every object in pieces that we want to add to that object.neighbors
        if (pieces[k] != pieces[kk]) { // if the object is not the piece being iterated through
          pieces[k].neighbors[kk] = pieces[kk]; // add that object to the
        }
      }
    }

    // place images on load
    for (var cat in pieces) {
      $("body").append("<img src='" + pieces[cat].img + "' class='piece' id='" + pieces[cat].pieceName + "'>");
      $(".piece").last().css("left", pieces[cat].currentPos[0]);
      $(".piece").last().css("top", pieces[cat].currentPos[1]);
    }

    // on piece drag
    $(".piece").draggable({
      stop: function() {
        var object = pieces[$(this).attr("id")];
        object.currentPos = [parseInt($(this).css("left")), parseInt($(this).css("top"))];

        // check if images line up & move image
        if (object.checkPosition()){

          console.log("success!");

          $(this).css("left", object.currentPos[0]);
          $(this).css("top", object.currentPos[1]);
        };
      }
    });

  });
});
