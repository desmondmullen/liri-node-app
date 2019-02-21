# liri-node-app

**This "Language Interpretation and Recognition Interface" node app retrieves data from Bandsintown, Spotify, and OMDB and formats the data cleanly to present readable information in a consistent format.**

# Features
In addition to the basic functions of the assignment (collecting user queries, retrieving data for the queries, outputting readable data), this app does the following:

### ADDITIONAL FEATURES:
* User is presented with basic instruction and examples of the use of the app if they type `node liri` without any parameters.
* Minor implementation of chalk to make the examples-of-use and search action "headlines" easier to read.
* Every use of the app writes data to a log file. Instead of logging the full results of each search, I chose to log only the search parameters (e.g., 'concert-this Paul McCartney') so that log.txt - the list of past searches - could be easily used to generate random searches when a user types `node liri do-what-it-says` without additional parameters.
* Additionally, do-what-it-says can be invoked with a simple parameter ('concert', 'song', or 'movie', e.g., `node liri do-what-it-says concert` to get results for the corresponding "default" searches contained in the random.txt file.

### SCREENSHOTS:
1. `node liri` without arguments brings up basic instructions and examples:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/1.node_liri_without_arguments.png)
2. `node liri concert-this The Who`:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/2.concert-this_The_Who.png)
3. `node liri spotify-this-song Sign of the Times`:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/3.spotify-this-song_Sign_of_the_Times.png)
4. `node liri movie-this Star Wars`:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/4.movie-this_Star_Wars.png)
5. `node liri do-what-it-says` gets random search query from log.txt:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/5.do-what-it-says_random_from_log.png)
6. `node liri do-what-it-says concert` gets concert example from random.txt:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/6.do-what-it-says_concert.png)
7. `node liri do-what-it-says song` gets song example from random.txt:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/7.do-what-it-says_song.png)
8. `node liri do-what-it-says movie` gets movie example from random.txt:
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/8.do-what-it-says_movie.png)