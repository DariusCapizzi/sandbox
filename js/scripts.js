var canvas = {};

function Pic(element) {
  this.element = element;
  this.id = Math.floor(Math.random() * 100000);
  this.selected = false;
  this.position = [0,0];
  this.opacity = true;
}

var selectedPics = [];
$(function () {
var newPic = {};
    //add user images to pieces
  $(":file").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        addPic("<img src='" + e.target.result + "' class='pic'>");
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  $("#opacity").click(function() {
    console.log("hi");
    selectedPics.forEach(function (pic) {
      // $("#" + pic.id).css("");
      pic.opacity = !pic.opacity;
    });
  });
  // $("#save").click(function() {
  //   var oldCanvas = canvas;
  //   canvas = {};
  //   drawAll();
  //   $("body").append("<p>saved</p>");
  //   $("p").last().click(function() {
  //     canvas = oldCanvas;
  //     drawAll();
  //   });
  // });
  // // join button
  // $("#join").click(function () {
  //   joinPics();
  // });
  //
  // // toggle button
  // $("#hide").click(function () {
  //   selectedPics.forEach(function (pic) {
  //     $("#" + pic.id).css("");
  //   });
  // });
  //
  // scale slider
  // $("#scale").on("input", function () {
  //   console.log("dsdfdf")
  //   selectedPics.forEach(function (pic) {
  //     $("#" + pic.id).css("width", $("#scale").val() + "%");
  //   });
  // });
  //
  // // move forward
  // $("#forward").click(function () {
  //   selectedPics.forEach(function (pic) {
  //     console.log(parseInt($("#" + pic.id).css("z-index")));
  //     var newZ = parseInt($("#" + pic.id).css("z-index")) + 1;
  //     $("#" + pic.id).css("z-index", newZ);
  //   });
  // });
  //
  // // move backward
  // $("#backward").click(function () {
  //   selectedPics.forEach(function (pic) {
  //     var newZ = parseInt($("#" + pic.id).css("z-index")) - 1;
  //     $("#" + pic.id).css("z-index", newZ);
  //   });
  // });


function addPic(element) {
  //add newPic object and add image to document
  var newPic = new Pic(element);
  canvas[newPic.id] = newPic;
  drawPic(canvas[newPic.id]);
}

function drawPic(newPic) {
  $(".main").append(newPic.element);
  $(".pic").last().attr("id", newPic.id);
  $(".pic").last().attr("left", newPic.position[0]);
  $(".pic").last().attr("top", newPic.position[1]);
  if(newPic.opacity) {
  $(".pic").last().addClass(".transparent");
} else {
  $(".pic").last().removeClass(".transparent");
}


  $(".pic").last().draggable({
    drag: function () {
      newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
    }
  });
  // select image on click
  $(".pic").last().on("click", function () {
    $(this).toggleClass("selected");
    canvas[$(this).attr("id")].selected = !canvas[$(this).attr("id")].selected;
    updateSelectedPics();
  });
}
function drawAll() {
  $(".main").empty();
  for (var pic in canvas) {
    console.log(pic);
    drawPic(pic);
  }
}
function joinPics() {
  console.log(selectedPics);
  var selectedIds = [];
  var selectedLeft = [];
  var selectedTop = [];

  selectedPics.forEach(function (pic) {
    selectedIds.push(pic.id);
    selectedLeft.push(pic.position[0]);
    selectedTop.push(pic.position[1]);
  });
  selectedIds = "#" + selectedIds.join(", #");

  // determine coordinates, width, and height of wrapping div --TODO: DOES NOT ALWAYS WORK RIGHT
  var sortedLeft = selectedLeft.sort(function (a, b) {
    return a - b;
  });
  var sortedTop = selectedTop.sort(function (a, b) {
    return a - b;
  });
  var rightMostPic = selectedPics[selectedLeft.indexOf(sortedLeft[sortedLeft.length - 1])];
  var bottomMostPic = selectedPics[selectedTop.indexOf(sortedTop[sortedTop.length - 1])];

  var newLeft = sortedLeft[0];
  var newTop = sortedTop[0];
  var newWidth = rightMostPic.position[0] - newLeft + rightMostPic.width;
  var newHeight = bottomMostPic.position[1] - newTop + bottomMostPic.height;

  //create new Pic for group
  var newPic = new Pic("");
  canvas[newPic.id] = newPic;
  newPic.position = [newLeft, newTop];
  newPic.width = newWidth;
  newPic.height = newHeight;
  newPic.childen = selectedPics;

  // wrap in div and set coordinates, width, and height
  $(selectedIds).wrapAll("<div class='group pic' id='" + newPic.id + "' />");
  $(".group").last().css("left", newPic.position[0]);
  $(".group").last().css("top", newPic.position[1]);
  $(".group").last().css("width", newPic.width);
  $(".group").last().css("height", newPic.height);

  selectedPics.forEach(function (pic) {
    pic.position[0] -= newLeft;
    pic.position[1] -= newTop;
    $("#" + pic.id).css("left", pic.position[0]);
    $("#" + pic.id).css("top", pic.position[1]);
    pic.selected = false;
    $("#" + pic.id).removeClass("selected");
    $("#" + pic.id).off();
    $("#" + pic.id).draggable("disable");
  });

  $(".group").last().click(function () {
    $(this).toggleClass("selected");
    canvas[$(this).attr("id")].selected = !canvas[$(this).attr("id")].selected;
    updateSelectedPics();
  });

  $(".group").last().draggable({
    drag: function () {
      newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
    }
  });
  updateSelectedPics();
}

function updateSelectedPics() {
  selectedPics = [];
  for (var e in canvas) {
    if (canvas[e].selected) {
      selectedPics.push(canvas[e]);
    }
  }
  console.log(selectedPics);
}

});
