function Piece(pieceName, img, currentPos, relativePos, neighbors) {
  this.pieceName = pieceName;
  this.img = img;
  this.currentPos = currentPos;
  this.relativePos = relativePos;
  this.neighbors = neighbors;
}

Piece.prototype.checkPosition = function() {
  for (var i = 0; i < this.neighbors.length; i++){
    // check if position is within 20px of any neighbor
    if (Math.abs((this.neighbors[i].currentPos[0] - this.currentPos[0]) - (this.neighbors[i].relativePos[0] - this.relativePos[0])) < 20
  && Math.abs((this.neighbors[i].currentPos[1] - this.currentPos[1]) - (this.neighbors[i].relativePos[1] - this.relativePos[1])) < 20) {
      // change position to sit alongside neighbor
      this.currentPos[0] = this.neighbors[i].currentPos[0] + this.relativePos[0] - this.neighbors[i].relativePos[0];
      this.currentPos[1] = this.neighbors[i].currentPos[1] + this.relativePos[1] - this.neighbors[i].relativePos[1];
    }
  }
}

// create new Piece objects
var cat1 = new Piece("cat1", "cat1.jpg", [10,50], [0,0]);
var cat2 = new Piece("cat2", "cat2.jpg", [270,54], [500,0]);
var cat3 = new Piece("cat3", "cat1.jpg", [100,50], [0,600]);
var cat4 = new Piece("cat4", "cat2.jpg", [70,34], [500,600]);

// set object relations
cat1.neighbors = [cat2, cat3];
cat2.neighbors = [cat1, cat4];
cat3.neighbors = [cat1, cat4];
cat4.neighbors = [cat2, cat3];

// set object of Piece objects
var pieces = {cat1, cat2, cat3, cat4};


$(function() {
  // place images on load
  for (var cat in pieces) {
    $("body").append("<img src='img/" + pieces[cat].img + "' class='piece' id='" + pieces[cat].pieceName + "'>");
    $(".piece").last().css("left", pieces[cat].currentPos[0]);
    $(".piece").last().css("top", pieces[cat].currentPos[1]);
  }
  $(".piece").draggable({
    stop: function() {
      var object = pieces[$(this).attr("id")];
      object.currentPos = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
      
      // check if images line up
      object.checkPosition();

      // move image in case of "snap"
      $(this).css("left", object.currentPos[0]);
      $(this).css("top", object.currentPos[1]);
    }
  });
});
