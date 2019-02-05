import React, { Component } from "react";
import API from "./API";
import TempChartReChart from "./TempChartReChart";
import RainChart from "./RainChart";
import WindChart from "./WindChart";
import BarometricPressureChart from "./BarometricPressureChart";
import WindGust from "./WindGust";
import ChoiceBlock from "./ChoiceBlock";
import WindData from "./WindData";
import stateList from "./States";
import ComparisonChart from "./ComparisonChart";
import io from "socket.io-client";
import "./style.css";
const moment = require("moment");
let socket = io("/charts");

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            select: "",
            weatherData: [],
            toBeCharted: [],
            displayChart: "",
            state: "",
            city: "",
            cityData: {},
            stationTemps: {},
            windData: [],
            today: moment(new Date()).format("YYYY-MM-DD"),
            tomorrow: moment(new Date()).add(1,'days').format("YYYY-MM-DD")
        }
    }
    handleChange = async event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        socket.send("handlechange");
        // Set the state for the appropriate input field
        await this.setState({
          [name]: value
        });
        if(this.state.select === "Choose a Weather Station") {
            return;
        }else if(this.state.select === "") {
            return;
        }else if(this.state.toBeCharted.length) {
            return;
        }else {
            this.stationWeather()
        }

      }
    stationWeather = () => {
        API.stationWeather(this.state.select)
        .then(data => {
            this.setState({weatherData: data.data})
            if(this.state.weatherData.length) {
                const dataCopy = this.state.weatherData;
                const secondCopy = this.state.weatherData;
                const latestDay = moment(secondCopy[secondCopy.length-1].date).format("MM-DD");
                const filterByLatestDay = secondCopy.filter(data => moment(data.date).format("MM-DD") === latestDay);
                const windData = filterByLatestDay.map(day => (
                    {wind_average: day.wind_average, wind_speed: day.wind_speed}
                ))
                WindData.processWindData(windData)
                .then(data => {
                    this.setState({windData: data})
                });
                const highTemp = Math.max.apply(Math, filterByLatestDay.map(function(o) {return o.ambient_temp}));
                const lowTemp = Math.min.apply(Math, filterByLatestDay.map(function(o) {return o.ambient_temp}));
                this.setState({stationTemps: {highTemp: (highTemp * 1.8 + 32), lowTemp: (lowTemp * 1.8 + 32)}})
                const shortData = dataCopy.splice(dataCopy.length-10, dataCopy.length);
                if(shortData.length) {
                    const superData = shortData.map(data => (
                        {x: (moment(data.date).format("hh:mm:ss a")), temp: (data.ambient_temp * 1.8 + 32), humidity: data.humidity, 
                        ground_temp: (data.ground_temp* 1.8 + 32), pressure: data.pressure, wind_speed: data.wind_speed, wind_gust: data.wind_gust,
                        wind_average: data.wind_average, rainfall_amt: data.rainfall_amt}
                    ))
                    this.setState({toBeCharted: superData});
                }
            }
            
        })
    }
    searchAPI = event => {
        event.preventDefault();
        API.cityWeather({city: this.state.city, state: this.state.state, today:this.state.today, tomorrow: this.state.tomorrow})
        .then(data => {
            this.setState({cityData: {highTemp: data.data.data[0].max_temp, lowTemp: data.data.data[0].min_temp}});
        })
    }
    
    componentDidMount() {
        socket.on("connect", function() {
            socket.send("hi");
            socket.on("test", function(data) {
                console.log(data);
            });
        });
        socket.on("get", () => {
            console.log("get from Pi");
            this.stationWeather();
        })
        API.stationQuery()
        .then(data => {
            this.setState({stations: data.data})
        })
    }
    render() {
        let chart;
        let choice;
        let entry;
        if(this.state.toBeCharted.length) {
            choice =  (<div>
                <ChoiceBlock 
                value={this.state.displayChart} 
                handleChange={this.handleChange}  />
                </div>)
            switch(this.state.displayChart) {
                case "Temperature and Humidity":
                    chart = <div className="chart mt-4"><TempChartReChart data={this.state.toBeCharted}/></div>
                    break;
                case "Wind Speed and Direction":
                    chart = <div className="chart mt-4"><WindChart data={this.state.windData}/></div>
                    break;
                case "Rainfall":
                    chart = <div className="chart mt-4"><RainChart data={this.state.toBeCharted}/></div>
                    break;
                case "Barometric Pressure":
                    chart = <div className="chart mt-4"><BarometricPressureChart data={this.state.toBeCharted}/></div>
                    break;
                case "Wind Gust":
                    chart = <div className="chart mt-4"><WindGust data={this.state.toBeCharted}/></div>
                    break;
                case "Comparison Chart":
                    entry = (
                        <div className="entry mx-auto">
                        <form className="form-inline">
                            <input type="text" value={this.state.city} onChange={this.handleChange} name="city" className="city mb-2 mr-4 form-control" placeholder="Search for City" />
                            <select value={this.state.state} onChange={this.handleChange} name="state" className="state mb-2 mr-4 form-control">
                            <option className="option">Choose a State</option>
                            {stateList.map(state => (
                                <option className="option" value={state}>{state}</option>
                            ))}
                        </select>
                            <button type="submit" className="btn btn-dark mb-2" onClick={this.searchAPI}>Search</button>
                        </form>
                        </div>
                    )

                        chart = (<div className="chart mt-4">
                        <ComparisonChart 
                        location={`${this.state.city.toUpperCase()},${this.state.state.toUpperCase()}`}
                        data={[{name: "JV Station", highTemp: this.state.stationTemps.highTemp, lowTemp: this.state.stationTemps.lowTemp},
                                {name: `${this.state.city},${this.state.state}`, highTemp: (this.state.cityData.highTemp * 1.8 + 32), lowTemp: (this.state.cityData.lowTemp * 1.8 + 32)}]}/>
                        </div>)
                    
                    break;
                default:
                entry = <div></div>    
                chart = <div></div>
            }
        }else{
            choice = <div></div>
        }

        return(
            <div className="pt-4">
                <div className="choose">
                    <label className="dropDown">
                        <select value={this.state.select} onChange={this.handleChange} name="select" className="form-control">
                            <option className="option">Choose a Weather Station</option>
                            {this.state.stations.map(station => (
                                <option className="option" value={station._id}>{station.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                {choice}
                {entry}
                {chart}
            </div>
        )
    }
}

export default Charts;