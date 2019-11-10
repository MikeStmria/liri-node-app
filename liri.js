require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);

var searchReq = process.argv[3];

var searchType = process.argv[2];

switch (searchType) {
    case 'concert-this':
    console.log("Bands In Town");
    break;

    case 'spotify-this-song':
    console.log("Spotify");
    break;

    case 'movie-this':
    console.log("OMDB");
    break;

    case 'do-what-it-says':
    console.log(searchType);
}

console.log(searchReq);