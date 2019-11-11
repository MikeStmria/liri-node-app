//dotenv require
require("dotenv").config();
//Requires
var keys = require("./keys.js");
var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api')
//Global Variables 
var keyword= process.argv[3];
var searchType = process.argv[2];

function runLiri() {

switch (searchType) {
    case 'concert-this':
        bandSearch(keyword);// run this function
        break;

    case 'spotify-this-song':
        searchSong(keyword);// run this function
        break;

    case 'movie-this':
        movieSearch(keyword); // run this function
        break;

    case 'do-what-it-says':
        console.log(searchType);// run this function
}
};

// Spotify search function

function searchSong (keyword) {
    var spotify = new Spotify(keys.Spotify);

    spotify.search({ type: 'track', query: keyword }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
};

// Bands in Town Search

function bandSearch(keyword) {

    var bandsQuery = "https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=codingbootcamp";

    axios.get(bandsQuery)
    .then( function (response){
        var info = response.data;

        for(i = 0; i < info.length; i++){
            console.log(`${info[i].lineup} will be performing in ${info[i].venue.city} ${info[i].venue.name} on ${info[i].datetime}`);
        }
        
        // console.log(info);
    });
}

// Movie Search

function movieSearch(keyword) {
    var movieQuery = `http://www.omdbapi.com/?t=${keyword}&apikey=trilogy`

    axios.get(movieQuery)
    .then( function (response){
        console.log(response);
    })
}

runLiri();