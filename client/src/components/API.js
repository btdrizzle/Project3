import axios from "axios";

export default {
    stationWeather: function(query) {
        const URL = "/api/weather/";
        return axios.get(`${URL}${query}`);
        
    },
    stationQuery: function() {
        const URL = "/api/stations";
        return axios.get(`${URL}`);
    },
    cityWeather: function(query) {
        const URL = "/api/weatherbit/";
        const queryFix = query.city.replace(/\s/g, "+"); 
        console.log(`${URL}${queryFix}`);
        return(
            axios.get(`${URL}`, {
                params: {
                    city: queryFix,
                    state: query.state,
                    today: query.today,
                    tomorrow: query.tomorrow
                }
            })
        )
    }
  };