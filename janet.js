require("dotenv").config();


var keys = require ("./keys.js");
var Spotify = require ('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var axios = require("axios");

var action = process.argv[2];
var value = process.argv[3];



switch(action) {
    case "concert-this":
    concertThis();
    break; 

    case "spotify-this-song":
    spotifyThis();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doThis(); 
    break; 

    case "girl":
    console.log("Not a girl.")
    break;

    case "robot":
    console.log("Not a robot.")
    break; 
}

function movieThis () {

    var movieUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    
    axios.get(movieUrl).then(
        function(response) {
          fs.appendFile("log.txt", 
          `Title: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB Rating: ${response.data.Ratings[0].Value} \nRT Rating: ${response.data.Ratings[1].Value} \nCountry: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`,
          function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Title: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB Rating: ${response.data.Ratings[0].Value} \nRT Rating: ${response.data.Ratings[1].Value} \nCountry: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
            }
          }
          )
        }
      );
}

function concertThis () {

    var concertUrl = "https://rest.bandsintown.com/artists/"+ value + "/events?app_id=idkey";

    axios.get(concertUrl).then(
      function(response) {
        fs.appendFile("log.txt", 
          `Venue: ${response.data[0].venue.name} \nLocation: ${response.data[0].venue.city} \nDate: ${response.data[0].datetime}`,
          function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Venue: ${response.data[0].venue.name} \nLocation: ${response.data[0].venue.city} \nDate: ${response.data[0].datetime}`);
            }
          }
         )
      }
    );
}

function spotifyThis () {
  spotify
  .search ({type: 'track', query: value}).then(
    function(response) {
      fs.appendFile("log.txt", 
      `Name: ${response.tracks.items[0].name}\nArtist: ${response.tracks.items[0].artists[0].name}\nAlbum: ${response.tracks.items[0].album.name}\nPreview: ${response.tracks.items[0].preview_url}`,
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Name: ${response.tracks.items[0].name}\nArtist: ${response.tracks.items[0].artists[0].name}\nAlbum: ${response.tracks.items[0].album.name}\nPreview: ${response.tracks.items[0].preview_url}`);
        }
      }
     )
    }
  );

}

function doThis () {

  fs.readFile("random.txt", "utf8", function(err, data){
    if(err) {
      return console.log(err);
    }

    console.log(data);

    var dataArr = data.split(",");

    console.log(dataArr);
  })


}