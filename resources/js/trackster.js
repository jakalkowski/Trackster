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
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {

  let url = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json"
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
