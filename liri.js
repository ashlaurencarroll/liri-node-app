require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var axios = require('axios');


console.log('this is loaded');


// exports.spotify = {
//    id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
//  };


var command = process.argv[2];
var input = process.argv.slice([3]).join(" ");
        


    switch (command) {
        //case "concert-this":
            //concert();
            
            //break;
        case "spotify-this-song":
           music();
             
            break;
        case "movie-this":
            omdb();
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if(error) console.log(error);
                input = data.split(",");
                searchTerm = input[1];
                liri(input[0]);
            })
            break;
        default:
            console.log("Invalid Option");
            break;
    }

//var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

//axios.get(queryURL).then( function(response) {
//console.log(reponse)
//});

//function concert() {
    //request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, info) {

        //if (!error && response.statusCode === 200) {

           // var parsed = JSON.parse(info);
        
          // for (var i = 0; i < parsed.length; i++) {
             //  console.log("**********");
              // console.log("Venue Name: " + parsed[i].venue.name);
              // console.log("Location: " + parsed[i].venue.city + ", " + parsed[i].venue.region);
              // var time = moment(parsed[i].datetime, "YYYY-MM-DD HH:mm:ss").format("MM-DD-YYYY");
                //console.log("Date: " + time);
            //}
        //}
   //});
//} 

function music() {
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) return console.log('Error occurred: ' + err);
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log("**********");
            for (var e = 0; e < songs[i].artists.length; e++) {
                console.log("Artist " + (e + 1) + ": " + songs[i].artists[e].name);
            }
            console.log("Song Name: " + songs[i].name);
            console.log("Preview: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
        }
    });
}


function omdb() {

    request("http://www.omdbapi.com/?t=" + input + "&plot=short&apikey=trilogy", function (error, response, info) {
        if (!error && response.statusCode === 200) {
            info = JSON.parse(info);
            console.log("Movie Name: " + info.Title);
            console.log("Release Year: " + info.Year);
            console.log("IMDB Rating: " + info.imdbRating);
            console.log("Country: " + info.Country);
            console.log("Language: " + info.Language);
            console.log("Plot: " + info.Plot);
            console.log("Actors: " + info.Actors);

        }
    });
}