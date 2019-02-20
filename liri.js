const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const fs = require('fs');
const chalk = require('chalk');
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

var theAction = process.argv[2];
var theRequest = (process.argv.slice(3, process.argv.length)).join(" ");
var theSearch = (process.argv.slice(3, process.argv.length)).join("+");

function doTheAction() {
    switch (theAction) {
        case "concert-this":
            concertThis(theRequest, theSearch);
            break;
        case "spotify-this-song":
            if (theRequest === "") {
                theRequest = "Default Search: The Sign Ace of Base";
                theSearch = "The+Sign+Ace+of+Base";
            }
            spotifyThisSong(theRequest, theSearch);
            break;
        case "movie-this":
            movieThis(theRequest, theSearch);
            break;
        case "do-what-it-says":
            doWhatItSays(theRequest);
            break;
        default:
            console.log(chalk.white("\nPlease enter a command followed by a search parameter"));
            console.log(chalk.white("following one of these examples:\n"));
            console.log("    node liri concert-this Elton John");
            console.log("    node liri spotify-this-song Purple Haze");
            console.log("    node liri movie-this Titanic");
            console.log("    node liri do-what-it-says" + chalk.white("*"));
            console.log("        " + chalk.white("* this command does not use a search"));
            console.log(chalk.white("          parameter, it displays a default item)\n"));
            console.log(chalk.white("    for '" + chalk.green("node liri do-what-it-says") + "', you can optionally add"));
            console.log(chalk.white("    a space and the word " + chalk.green("'band'") + ", " + chalk.green("'song'") + ", or " + chalk.green("'movie'") + " to see"));
            console.log(chalk.white("    the default item of that type\n"));
    };
};

doTheAction();

function concertThis(request, artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("\n\nComing events for '" + request + "'");
            console.log("********************\n");
            artist.split(" ").join("+");
            Object.keys(response.data).forEach(function (key) {
                let theVenue = response.data[key].venue;
                console.log("Venue:    " + theVenue.name);
                let theLocation;
                if (theVenue.city) { theLocation = theVenue.city + ", " };
                if (theVenue.region) { theLocation += theVenue.region + ", " };
                if (theVenue.country) { theLocation += theVenue.country };
                console.log("Location: " + theLocation);
                console.log("Date:     " + moment(response.data[key].datetime).format('MM/DD/YYYY'));
                console.log("\n====================\n");
            });
            console.log("\n\n");
        })
        .catch(function (error) {
            console.log(error);
        });
};

function spotifyThisSong(request, song) {
    console.log("\n\nSearch results for '" + request + "'");
    console.log("********************\n");
    spotify.search({ type: "track", query: song, market: "US" }, function (err, data) {
        if (err) {
            return console.log("spotify error: " + err);
        }
        console.log("Artist:   " + data.tracks.items[0].album.artists[0].name); //artist
        console.log("Title:    " + data.tracks.items[0].name); //song name
        console.log("Preview:  " + data.tracks.items[0].preview_url); //preview link
        console.log("Album:    " + data.tracks.items[0].album.name); //album name
        console.log("\n====================\n");

    });
};

function movieThis(request, title) {
    axios.get("http://www.omdbapi.com/?s=" + title + "&plot=short&apikey=8474986c")
        .then(function (response) {
            console.log("\n\nSearch results for '" + request + "'");
            console.log("********************\n");
            title.split(" ").join("+");
            Object.keys(response.data.Search).forEach(function (key) {
                axios.get("http://www.omdbapi.com/?i=" + response.data.Search[key].imdbID + "&plot=short&apikey=8474986c")
                    .then(function (subResponse) {
                        let theMovie = subResponse.data;
                        console.log("Title:    " + theMovie.Title);
                        console.log("Year:     " + theMovie.Year);
                        Object.keys(theMovie.Ratings).forEach(function (key) {
                            let theRating = theMovie.Ratings[key];
                            if (theRating.Source === "Internet Movie Database") {
                                console.log("IMDB Rtg: " + theRating.Value);
                            } else {
                                if (theRating.Source === "Rotten Tomatoes") {
                                    console.log("RtTm Rtg: " + theRating.Value);
                                };
                            };
                        });
                        console.log("Country:  " + theMovie.Country);
                        console.log("Language: " + theMovie.Language);
                        console.log("Actors:   " + theMovie.Actors);
                        console.log("Plot:     ----------");
                        console.log(theMovie.Plot);
                        console.log("\n====================\n");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
            console.log("\n\n");
        })
        .catch(function (error) {
            console.log(error);
        });
};

function doWhatItSays(request) {
    if (request) {
        //request different results - band, song, movie
    };
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("fs error: " + err);
        }
        var theLine;
        switch (request) {
            case "band":
                theLine = data.split("\n")[0];
                break;
            case "song":
                theLine = data.split("\n")[1];
                break;
            case "movie":
                theLine = data.split("\n")[2];
                break;
            default:
                theLine = data.split("\n")[1];
        };
        theAction = theLine.split(",")[0];
        theRequest = (theLine.split(",")[1]).slice(1, -1);
        theSearch = theRequest.split(" ").join("+");
        doTheAction();
    });
};