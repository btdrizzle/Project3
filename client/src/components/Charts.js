import React, { Component } from "react";
import API from "./API";
import TempChartReChart from "./TempChartReChart";
import RainChart from "./RainChart";
import WindChart from "./WindChart";
import BarometricPressureChart from "./BarometricPressureChart";
import ChoiceBlock from "./ChoiceBlock";
const moment = require("moment");

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            select: "",
            weatherData: [],
            toBeCharted: [],
            displayChart: ""
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
    
    componentDidMount() {
        API.stationQuery()
        .then(data => {
            this.setState({stations: data.data})
        })
    }
    render() {
        let chart;
        let choice;
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
                default:
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
                {chart}
            </div>
        )
    }
}

export default Charts;