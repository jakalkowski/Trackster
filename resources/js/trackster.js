var Trackster = {};

const API_KEY = "525697adce8c37fb7c6fbecddf2e874a";

/* Hide search animation when document is loaded. */
$(document).ready(function(){
  $(".animation").hide();
});

/* Initiate search using search button */

$(document).on("click", "#search-button", function(){
  // Search tracks if any characters are in the search field
  if ($("#search-input").val().length > 0) {
    Trackster.searchTracksByTitle($("#search-input").val());
    $("#search-animation").addClass("animated rubberBand");
    $(".animation").show();
  }

  //console.log("Song list.")
  //$.ajax({url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=525697adce8c37fb7c6fbecddf2e874a&format=json",
          //datatype: 'jsonp',
          //success: function(){$("#search-input").html(console.log($("#search-input").val()))}
  //})

});

/*
  Use the "Return" key, a.k.a. "Enter", to submit user search when a user
  finishes typing in the search box.
*/
$(document).ready(function(){
  $("#search-input").keydown(function(keyEvent){
    // check if enter (keyCode 13) is pressed. If anything in search field, search
    if (keyEvent.keyCode == 13 && $("#search-input").val().length > 0){
      Trackster.searchTracksByTitle($("#search-input").val());
      console.log(keyEvent);
      $("#search-animation").addClass("animated rubberBand");
      $(".animation").show();
    };
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  console.log("Rendering tracks:")
  console.log(tracks)

  $("#track-list").empty();
  $("#search-animation").removeClass("animated rubberBand");
  setTimeout(function(){
    $(".animation").hide();
  }, 700);

  for (i = 0; i <= tracks.length - 1 ; i++){

    var mediumAlbumArt = tracks[i].image[1]["#text"];

    var htmlTrackRow =
      "<div class='row track'>" +
        "<div class='col-xs-1 col-xs-offset-1 play-button'>" +
          "<a href='" + tracks[i].url + "' target='_blank'>" +
            "<i class='fa fa-play-circle-o fa-2x'></i>" +
          "</a>" +
         "</div>" +
         "<div class='col-xs-4 name'>" + tracks[i].name + "</div>" +
         "<div class='col-xs-2 artist'>" + tracks[i].artist + "</div>" +
         "<div class='col-xs-2'><img src='" + mediumAlbumArt + "'></div>" +
         "<div class='col-xs-2 listeners'>" + numeral(tracks[i].listeners).format("0,0") + "</div>" +
      "</div>";

      console.log(tracks.length);
      console.log(tracks[i].name + " " + tracks[i].artist + " " + tracks[i].listeners);
      console.log(mediumAlbumArt);

      $("#track-list").append(htmlTrackRow);

  }

  /*
  Allow the user to sort the columns by any attribute of the track information by
  clicking on the corresponding column.
  */

  // NAME SORTING

  var names = []
  for (x = 0; x < $(".name").length; x++) {
    names.push($(".name")[x].textContent)
  }

  console.log(names)

  names.sort()

  console.log(names)

  // LISTENER SORTING

  var listeners = []
  for (x = 0; x < $(".listeners").length; x++) {
    listeners.push(numeral($(".listeners")[x].textContent).format("0"))
  }

  console.log(listeners)

  listeners.sort( (a,b) => a-b )

  console.log(listeners)

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {

  var url = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json"

  $.ajax({url: url,
          datatype: 'jsonp',
          //success: function(){$("#search-input").html(console.log($("#search-input").val()))}
          success: function(response){
            //console.log("Liste: " + response.results.trackmatches.track)
            Trackster.renderTracks(response.results.trackmatches.track)
          },
          error: function(err) {
            console.log("Oops, something went wrong!")
            console.log(err)
          }
  });

};
