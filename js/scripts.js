function Piece(pieceName, img, currentPos, relativePos, relatedPieces) {
  this.pieceName = pieceName;
  this.img = img;
  this.currentPos = currentPos;
  this.relativePos = relativePos;
  this.relatedPieces = relatedPieces;
}

Piece.prototype.check = function() {
  //this.relatedPieces.forEach(function(related) {
    console.log(this.relatedPieces[0].currentPos[0] - this.currentPos[0]);
    console.log(this.relatedPieces[0].relativePos[0] - this.relativePos[0]);
    //check left coordinate
    if (this.relatedPieces[0].currentPos[0] - this.currentPos[0] === this.relatedPieces[0].relativePos[0] - this.relativePos[0]) {
      alert("Yeah!");
    }
  //});
}


var cat1 = new Piece(cat1, "cat1.jpg", [10,50], [0,0]);
var cat2 = new Piece(cat2, "cat2.jpg", [270,0], [500,0]);
cat1.relatedPieces = [cat2];
cat2.relatedPieces = [cat1];
var cats = [cat1, cat2];


//
$(function() {
  cats.forEach(function(cat) {
    $("body").append("<img src='img/" + cat.img + "' class='piece' id='" + cat.pieceName + "'>");
    $(".piece").last().css("left", cat.currentPos[0]);
    $(".piece").last().css("top", cat.currentPos[1]);
  });
  $(".piece").draggable({
    drag: function() {
      cats.forEach(function(cat) {
        var left = $("#" + cat.pieceName).css("left");
        var top =  $("#" + cat.pieceName).css("top");
        cat.currentPos = [left, top];
        cat.check();
      });
      }
  });
});
