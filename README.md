# Project3 Weather Station

I will construct a weather station utilizing a Raspberry Pi and various connected sensors.  This weather station will send data to a hosted website via POST request and will be stored in a database.  The user experience on the site involves viewing historical weather data from a weather API such as OpenWeather and comparing this data to the weather station.  This information is juxtaposed in graphical format for the user.

## Raspberry Pi

I will construct a weather station using a Raspberry Pi.  There are various tutorials on Raspberry Pi weather station construction and I will primarily utulize the tutorial on the Raspberry Pi website:

[Raspberry Pi Weather Station](https://projects.raspberrypi.org/en/projects/build-your-own-weather-station)

Raspberry Pi utilizes Python and its various libraries for communication with the various sensors in this project.

The weather station will take data measurements over a pre-defined time period (say 10 minutes) and will connect to a hosted website and send data via a POST request.

The project includes sensors for temperature, humidity, wind direction, wind speed, and a rain gauge.  While not part of the project tutorial, I would also like to add a USB GPS receiver to send coordinates when sending post requests.  

## Graphical Format

I will utilize a library such as Chartist.js to present the data.  Ideally, data presentation would be interactive, with users having the option to present more or less data with buttons or checkboxes.

## Database

The data from the Raspberry Pi will be stored in a SQL database and will utilize the Sequelize ORM for server-side interaction.

## Security

The weather station (as well as future compatibility with future stations) will use a prescribed API key in the post request to authenticate the station.  When the server receives the post request, it will search the database for the presence of that API key - if not present, the POST request will fail.

## Framework

This project will utilize either Vue or React.

## Fun Additions

I will add my weather station to the list of amateur stations contributing to Open Weather.  