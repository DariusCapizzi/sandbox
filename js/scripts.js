var canvas = {};

function Pic(img) {
  this.img = img;
  this.id = Math.floor(Math.random() * 100000);
  this.position = [];
  this.width = 0;
  this.height = 0;
  this.selected = false;
}

$(function () {
  var selectedPics = [];
  var newPic = {};

  //add user images to pieces
  $(":file").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        addPic(e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  // join button
  $("#join").click(function () {
    console.log(selectedPics)
    var selectedIds = [];
    var selectedLeft = [];
    var selectedTop = [];
    selectedPics.forEach(function(pic) {
      selectedIds.push(pic.id);
      selectedLeft.push(pic.position[0]);
      selectedTop.push(pic.position[1]);
    });
    selectedIds = "#" + selectedIds.join(", #");
    var sortedLeft = selectedLeft.sort(function (a, b) { return a - b; });
    var sortedTop = selectedTop.sort(function (a, b) { return a - b; });
    var rightMostPic = selectedPics[selectedLeft.indexOf(sortedLeft[sortedLeft.length - 1])];
    var bottomMostPic = selectedPics[selectedTop.indexOf(sortedTop[sortedTop.length - 1])];
    var newLeft = sortedLeft[0];
    var newTop = sortedTop[0];
    console.log(rightMostPic.position[0])
    console.log(newLeft)
    console.log(rightMostPic.width)
    var newWidth = rightMostPic.position[0] - newLeft + rightMostPic.width;
    var newHeight = bottomMostPic.position[1] - newTop + bottomMostPic.height;
    // console.log(selectedPics[selectedLeft.indexOf(sortedLeft[selectedLeft.length - 1])]);
    $(selectedIds).wrapAll("<div class='group pic' />");
    $(".group").last().css("left", newLeft);
    $(".group").last().css("top", newTop);
    $(".group").last().css("width", newWidth);
    $(".group").last().css("height", newHeight);
    selectedPics.forEach(function(pic) {
      pic.position[0] -= newLeft;
      pic.position[1] -= newTop;
      $("#" + pic.id).css("left", pic.position[0]);
      $("#" + pic.id).css("top", pic.position[1]);
      pic.selected = false;
      $("#" + pic.id).removeClass("selected");
      $("#" + pic.id).draggable( "disable" );
    });

    $(".group").click(function() {
      
    })

    $(".pic").draggable({
      drag: function () {
        newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
      }
    });
  });

  function addPic(src) {
    //add newPic object and add image to document
    newPic = new Pic(src);
    $("body").append("<img src='" + newPic.img + "' id='" + newPic.id + "' class='pic' >");
    newPic.width = $("#" + newPic.id).width();
    newPic.height = $("#" + newPic.id).height();
    canvas[newPic.id] = newPic;
    $(".pic").draggable({
      drag: function () {
        newPic.position = [parseInt($(this).css("left")), parseInt($(this).css("top"))];
      }
    });

    // select image on click
    $(".pic").click(function () {
      console.log("click")
      $(this).toggleClass("selected");
      canvas[$(this).attr("id")].selected = !canvas[$(this).attr("id")].selected;

      //update selectedPics{}
      selectedPics = [];
      for (var e in canvas) {
        if (canvas[e].selected) {
          selectedPics.push(canvas[e]);
        }
      }
      console.log(selectedPics)
    });
  }

});
