var canvas = {};

function Pic(element) {
  this.element = element;
  this.id = Math.floor(Math.random() * 100000);
  this.selected = false;
  this.position = [300, 100];
  this.children = {};
  this.width = 0;
  this.height = 0;
  this.opacity = 1;
  this.rotate = 0;
  this.scale = 1;
  this.blur = 0;
  this.sepia = 0;
  this.invert = 0;
  this.zIndex = 0;
}

var selectedPics = [];

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

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

  $("#opacity").click(function () {
    selectedPics.forEach(function (pic) {
      if (pic.opacity > 0.2) {
        pic.opacity = pic.opacity - 0.1;
      } else {
        pic.opacity = 1;
      }
      drawPic(pic);
    });
  });

  $("#rotate").click(function () {
    selectedPics.forEach(function (pic) {
      pic.rotate += 30;
      drawPic(pic);
    });
  });

  $("#scale-up").click(function () {
    selectedPics.forEach(function (pic) {
      pic.scale += .1;
      drawPic(pic);
    });
  });
  $("#scale-down").click(function () {
    selectedPics.forEach(function (pic) {
      pic.scale -= .1;
      drawPic(pic);
    });
  });
  $("#blur").click(function () {
    selectedPics.forEach(function (pic) {
      if (pic.blur === 0) {
        pic.blur = 5;
      } else {
        pic.blur = 0;
      }
      drawPic(pic);
    });
  });
  $("#sepia").click(function () {
    selectedPics.forEach(function (pic) {
      if (pic.sepia === 0) {
        pic.sepia = 1;
      } else {
        pic.sepia = 0;
      }
      drawPic(pic);
    });
  });
  $("#invert").click(function () {
    selectedPics.forEach(function (pic) {
      if (pic.invert === 0) {
        pic.invert = 1;
      } else {
        pic.invert = 0;
      }
      drawPic(pic);
    });
  });

  $("#join").click(function () {
    joinPics();
  });

  $("#delete").click(function () {
    selectedPics.forEach(function (pic) {
      delete canvas[pic.id];
      $("#" + pic.id).remove();
      updateSelectedPics();
    });
  });

  $("#forward").click(function () {
    selectedPics.forEach(function (pic) {
      pic.zIndex += 1;
      drawPic(pic);
    });
  });

  $("#backward").click(function () {
    selectedPics.forEach(function (pic) {
      pic.zIndex -= 1;
      drawPic(pic);
    });
  });

  function addPic(element) {
    //add newPic object and add image to document
    var newPic = new Pic(element);
    canvas[newPic.id] = newPic;
    drawPic(newPic);
  }

  function drawPic(newPic, parentDiv) {
    if (!parentDiv) {
      parentDiv = "body";
    }
    console.log(parentDiv)
    $("#" + newPic.id).remove();

    // make and set html attributes based on newPic
    $(parentDiv).append(newPic.element);
    $(".pic").last().attr("id", newPic.id);
    $("#" + newPic.id).css("left", newPic.position[0]);
    $("#" + newPic.id).css("top", newPic.position[1]);
    //draw chidlren
    for (var pic in newPic.children) {
      drawPic(pic, "#" + newPic.id)
    }
    //set selected
    if (newPic.selected) {
      $("#" + newPic.id).addClass("selected");
    } else {
      $("#" + newPic.id).removeClass("selected");
    }

    // sets opacity based on newPic
    $("#" + newPic.id).css("opacity", newPic.opacity);
    // sets rotation and scale based on newPic
    $("#" + newPic.id).css("transform", "rotate(" + newPic.rotate + "deg) scale(" + newPic.scale + ")");
    // sets blur, sepia, invert
    $("#" + newPic.id).css("filter", "blur(" + newPic.blur + "px) sepia(" + newPic.sepia + ") invert(" + newPic.invert + ")");
    $("#" + newPic.id).css("-webkit-filter", "blur(" + newPic.blur + "px) sepia(" + newPic.sepia + ") invert(" + newPic.invert + ")");
    // sets z-index
    $("#" + newPic.id).css("z-index", newPic.zIndex);

    // sets element to be draggable
    $("#" + newPic.id).draggable({
      drag: function () {
        newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
      }
    });

    // add to selected on click
    $("#" + newPic.id).on("click", function () {
      $(this).toggleClass("selected");
      newPic.selected = !newPic.selected;
      updateSelectedPics();
    });
  }

  function drawAll() {
    $("body").empty();
    for (var pic in canvas) {
      console.log(pic);
      drawPic(pic);
    }
  }

  // function joinPics() {
  //   console.log("join");
  //   var selectedIds = [];
  //   var selectedLeft = [];
  //   var selectedTop = [];
  //
  //   selectedPics.forEach(function (pic) {
  //     selectedIds.push(pic.id);
  //     selectedLeft.push(pic.position[0]);
  //     selectedTop.push(pic.position[1]);
  //   });
  //   selectedIds = "#" + selectedIds.join(", #");
  //
  //   // determine coordinates, width, and height of wrapping div --TODO: DOES NOT ALWAYS WORK RIGHT
  //   var sortedLeft = selectedLeft.sort(function (a, b) {
  //     return a - b;
  //   });
  //   var sortedTop = selectedTop.sort(function (a, b) {
  //     return a - b;
  //   });
  //   var rightMostPic = selectedPics[selectedLeft.indexOf(sortedLeft[sortedLeft.length - 1])];
  //   var bottomMostPic = selectedPics[selectedTop.indexOf(sortedTop[sortedTop.length - 1])];
  //
  //   var newLeft = sortedLeft[0];
  //   var newTop = sortedTop[0];
  //   var newWidth = rightMostPic.position[0] - newLeft + rightMostPic.width;
  //   var newHeight = bottomMostPic.position[1] - newTop + bottomMostPic.height;
  //
  //   //create new Pic for group
  //   var newPic = new Pic("");
  //   canvas[newPic.id] = newPic;
  //   newPic.position = [newLeft, newTop];
  //   newPic.width = newWidth;
  //   newPic.height = newHeight;
  //   newPic.childen = selectedPics;
  //   newPic.
  //
  //   // wrap in div and set coordinates, width, and height
  //   $(selectedIds).wrapAll("<div class='group pic' id='" + newPic.id + "' />");
  //   $(".group").last().css("left", newPic.position[0]);
  //   $(".group").last().css("top", newPic.position[1]);
  //   $(".group").last().css("width", newPic.width);
  //   $(".group").last().css("height", newPic.height);
  //
  //   selectedPics.forEach(function (pic) {
  //     pic.position[0] -= newLeft;
  //     pic.position[1] -= newTop;
  //     $("#" + pic.id).css("left", pic.position[0]);
  //     $("#" + pic.id).css("top", pic.position[1]);
  //     pic.selected = false;
  //     $("#" + pic.id).removeClass("selected");
  //     $("#" + pic.id).off();
  //     $("#" + pic.id).draggable("disable");
  //   });
  //
  //   $(".group").last().click(function () {
  //     $(this).toggleClass("selected");
  //     canvas[$(this).attr("id")].selected = !canvas[$(this).attr("id")].selected;
  //     updateSelectedPics();
  //   });
  //
  //   $(".group").last().draggable({
  //     drag: function () {
  //       newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
  //     }
  //   });
  //   updateSelectedPics();
  // }

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
