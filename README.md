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
![basic instructions](https://desmondmullen.com/liri-node-app/screenshots/1.node_liri_without_arguments)