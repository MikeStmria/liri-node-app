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

    spotify.search({ type: 'track', query: keyword, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var trocks = data.tracks.items;

        for (i=0; i < trocks.length;i++){
            // console.log(trocks[i].album.name); // Test console.log
            console.log(`-----
                \nArtist: ${trocks[i].artists[i].name}
                \nSong: ${trocks[i].name}
                \nlink: ${trocks[i].external_urls.spotify}
                \nAlbum: ${trocks[i].album.name}`);
        }
    });
    

    // for (i in trocks) {
    // }
    
    
        
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
        
        // console.log(info); // Is this working?
    });
}

// Movie Search

function movieSearch(keyword) {
    var movieQuery = `http://www.omdbapi.com/?t=${keyword}&apikey=trilogy`

    axios.get(movieQuery)
    .then( function (response){
        var movieInfo = response.data;
        // console.log(movieInfo.Ratings[1].Value); //Is this working console.log

        if (keyword) {

            console.log(`Title: ${movieInfo.Title}
                        \nReleased: ${movieInfo.Released}
                        \n ** Ratings **
                        \nIMDB: ${movieInfo.imdbRating}
                        \nRotten Tomatos: ${movieInfo.Ratings[1].Value}
                        \n -----
                        \nCountry: ${movieInfo.Country}
                        \nLanguage: ${movieInfo.Language}
                        \nPlot: ${movieInfo.Plot}
                        \nActors: ${movieInfo.Actors}`)
        }
        else {
            console.log("Mr. Nobody");
        }
    })
}

runLiri();