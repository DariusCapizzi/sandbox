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
    if (Math.abs((this.neighbors[i].currentPos[0] - this.currentPos[0]) - (this.neighbors[i].relativePos[0] - this.relativePos[0])) < 120
  && Math.abs((this.neighbors[i].currentPos[1] - this.currentPos[1]) - (this.neighbors[i].relativePos[1] - this.relativePos[1])) < 120) {
      // change position to sit alongside neighbor
      this.currentPos[0] = this.neighbors[i].currentPos[0] + this.relativePos[0] - this.neighbors[i].relativePos[0];
      this.currentPos[1] = this.neighbors[i].currentPos[1] + this.relativePos[1] - this.neighbors[i].relativePos[1];
    }
  }
}

// create new Piece objects
var uni1 = new Piece("uni1", "unicycle-full/seat.jpg", [10,50], [222,50]);
var uni2 = new Piece("uni2", "unicycle-full/bottom_fork.jpg", [270,54], [351, 326]);
var uni3 = new Piece("uni3", "unicycle-full/fork.jpg", [100,50], [358, 158]);
var uni4 = new Piece("uni4", "unicycle-full/left_peddle.jpg", [70,34], [261, 344]);
var uni5 = new Piece("uni5", "unicycle-full/right_peddle.jpg", [70,34], [432, 204]);
var uni6 = new Piece("uni6", "unicycle-full/wheel.jpg", [70,34], [319, 231]);
var uni7 = new Piece("uni7", "unicycle-full/post-attach.jpg", [70,34], [337, 156]);

// set object relations
uni1.neighbors = [uni7, uni3];
uni2.neighbors = [uni3, uni6];
uni3.neighbors = [uni7, uni2, uni1];
uni4.neighbors = [uni6];
uni5.neighbors = [uni6];
uni6.neighbors = [uni4, uni5, uni2, uni3];
uni7.neighbors = [uni1, uni3];

// set object of Piece objects
var pieces = {uni1, uni2, uni3, uni4, uni5, uni6, uni7};


$(function() {
  // place images on load
  for (var uni in pieces) {
    $("body").append("<img src='img/" + pieces[uni].img + "' class='piece' id='" + pieces[uni].pieceName + "'>");
    $(".piece").last().css("left", pieces[uni].currentPos[0]);
    $(".piece").last().css("top", pieces[uni].currentPos[1]);
  }

  $(".piece").draggable({
    stop: function() {
      var object = pieces[$(this).attr("id")];
      console.log(pieces)
      object.currentPos = [parseInt($(this).css("left")), parseInt($(this).css("top"))];

      // check if images line up
      object.checkPosition();

      // move image in case of "snap"
      $(this).css("left", object.currentPos[0]);
      $(this).css("top", object.currentPos[1]);
    }
  });
});
