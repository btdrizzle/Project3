import React, { Component } from "react";
import API from "./API";
import TempChartReChart from "./TempChartReChart";
import RainChart from "./RainChart";
import WindChart from "./WindChart";
import BarometricPressureChart from "./BarometricPressureChart";
import WindGust from "./WindGust";
import ChoiceBlock from "./ChoiceBlock";
//import WindData from "./WindData";
import ComparisonChart from "./ComparisonChart";
import "./style.css";
const moment = require("moment");

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
            today: moment(new Date()).format("YYYY-MM-DD"),
            tomorrow: moment(new Date()).add(1,'days').format("YYYY-MM-DD")
        }
    }
    handleChange = async event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
    
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
                
                const shortData = dataCopy.splice(dataCopy.length-10, dataCopy.length);
                if(shortData.length) {
                    const superData = shortData.map(data => (
                        {x: (moment(data.date).format("hh:mm:ss a")), temp: (data.ambient_temp * 1.8 + 32), humidity: data.humidity, 
                        ground_temp: (data.ground_temp* 1.8 + 32), pressure: data.pressure, wind_speed: data.wind_speed, wind_gust: data.wind_gust,
                        wind_average: data.wind_average, rainfall_amt: data.rainfall_amt}
                    ))
                    this.setState({toBeCharted: superData});
                    console.log(superData);
                }
            }
            
        })
    }
    searchAPI = event => {
        event.preventDefault();
        API.cityWeather({city: this.state.city, state: this.state.state, today:this.state.today, tomorrow: this.state.tomorrow})
        .then(data => {
            console.log(data);
            this.setState({cityData: {highTemp: data.data.data[0].max_temp, lowTemp: data.data.data[0].min_temp}});
        })
    }
    
    componentDidMount() {
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
                    chart = <div className="chart mt-4"><WindChart data={this.state.toBeCharted}/></div>
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
                            <input type="text" value={this.state.city} onChange={this.handleChange} name="city" className="mb-2 mr-4" placeholder="Search for City" />
                            <input type="text" value={this.state.state} onChange={this.handleChange} name="state" className="mb-2 mr-4" placeholder="State" />
                            <button type="submit" className="btn btn-dark mb-2" onClick={this.searchAPI}>Search</button>
                        </form>
                        </div>
                    )
                    if(this.state.cityData.length) {
                        chart = (<div className="chart mt-4">
                        <ComparisonChart 
                        data={this.state.toBeCharted}/>
                        </div>)
                    }
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