var axios = require('axios');
var moment = require('moment');
require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            Object.keys(response.data).forEach(function (key) {
                console.log(response.data[key].venue.name);
                console.log(response.data[key].venue.city, response.data[key].venue.region, response.data[key].venue.country);
                console.log(moment(response.data[key].datetime).format('MM/DD/YYYY'));
                console.log("---------");
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};
concertThis("wailin+storms");


/*spotify-this-song
This will show the following information about the song in your terminal/bash window

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.*/

function movieThis(title) {
    axios.get("http://www.omdbapi.com/?s=" + title + "&plot=short&apikey=8474986c")
        .then(function (response) {
            Object.keys(response.data.Search).forEach(function (key) {
                axios.get("http://www.omdbapi.com/?i=" + response.data.Search[key].imdbID + "&plot=short&apikey=8474986c")
                    .then(function (subResponse) {
                        console.log("Title:    " + subResponse.data.Title);
                        console.log("Year:     " + subResponse.data.Year);
                        Object.keys(subResponse.data.Ratings).forEach(function (key) {
                            let theRating = subResponse.data.Ratings[key];
                            if (theRating.Source === "Internet Movie Database") {
                                console.log("IMDB Rtg: " + theRating.Value);
                            } else {
                                if (theRating.Source === "Rotten Tomatoes") {
                                    console.log("RtTm Rtg: " + theRating.Value);
                                };
                            };
                        });
                        console.log("Country:  " + subResponse.data.Country);
                        console.log("Language: " + subResponse.data.Language);
                        console.log("Actors:   " + subResponse.data.Actors);
                        console.log("Plot:     ----------");
                        console.log(subResponse.data.Plot);
                        console.log("====================");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};
// movieThis("titanic");



/*do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/