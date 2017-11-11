var Trackster = {};

const API_KEY = "525697adce8c37fb7c6fbecddf2e874a";

$(document).on("click", "#search-button", function(){
  Trackster.searchTracksByTitle($("#search-input").val());
  //console.log("Song list.")

  //$.ajax({url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=525697adce8c37fb7c6fbecddf2e874a&format=json",
          //datatype: 'jsonp',
          //success: function(){$("#search-input").html(console.log($("#search-input").val()))}
  //})

});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  console.log("Rendering tracks:")
  console.log(tracks)

  $("#track-list").empty();

  for (i = 0; i <= tracks.length - 1; i++){
    var htmlTrackRow =
      "<div class='row track'>" +
        "<div class='col-xs-1 col-xs-offset-1 play-button'>" +
          "<a href='#' target='_blank'>" +
            "<i class='fa fa-play-circle-o fa-2x'></i>" +
          "</a>" +
         "</div>" +
         "<div class='col-xs-4'>" + tracks[i].name + "</div>" +
         "<div class='col-xs-2'>" + tracks[i].artist + "</div>" +
         "<div class='col-xs-2'><img src='" + mediumAlbumArt + "'></div>" +
         "<div class='col-xs-2'>" + tracks[i].listeners + "</div>" +
      "</div>";

      var mediumAlbumArt = tracks[i].image[1]["#text"];

      console.log(tracks.length);
      console.log(tracks[i].name + " " + tracks[i].artist + " " + tracks[i].listeners);

      $("#track-list").append(htmlTrackRow);
  }

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
  })

}
