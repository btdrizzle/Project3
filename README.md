# Project3 Weather Station

I constructed a weather station utilizing a Raspberry Pi and various connected sensors.  This weather station sends data to a hosted website via POST request and is stored in a database.  The user experience on the site involves viewing historical weather data from a weather API Weatherbit.io and comparing this data to the weather station.  This information is juxtaposed in graphical format for the user.  Users can compare temp data for today compared to other cities.  Users can also see the latest updates from the station with wind gust, humidity, ambient temperature, ground temperature, wind direction, wind speed, and rain.

## Raspberry Pi

I used the following tutorial for making the station.  

[Raspberry Pi Weather Station](https://projects.raspberrypi.org/en/projects/build-your-own-weather-station)

I used the following git repo for base code Python scripts for interacting with GPIO ports on Pi:

[Oracle Raspberry Pi Weather Station Software](https://github.com/RaspberryPiFoundation/weather-station)

Raspberry Pi utilizes Python and its various libraries for communication with the multiple sensors in this project.

The weather station takes data measurements over a pre-defined time period of 5 minutes and pushes the data to Heroku.

The project includes sensors for temperature, humidity, wind direction, wind speed, and a rain gauge.  =

## Graphical Format

I utilize the Recharts javascript library to represent the data.

## Database

Data is stored in MongoDB - mLab on Heroku.

## Security

API keys are hidden to the user.

## Framework

I built this project using React.

## Additional Technologies

I set up a web socket using Socket.io.  When the Raspberry Pi makes a post request, it sends a socket message to the server, which broadcasts to all listening clients on the charts page and makes them make a new GET request for data.  The data, without interaction, changes dynamically and is visible on the chart being displayed.

I utilize the Google Maps API through npm package google-maps-react to display the location of the weather station on the map.

I use Moment.js for date and time calculations.

I use React-Parallax for the home page.

