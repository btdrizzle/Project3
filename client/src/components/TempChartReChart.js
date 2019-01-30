import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function TempChartReChart(props) {
    return(
            <div>
            <h3 className="text-center">Last 10 Temp and Humidity Readings at Weather Station</h3>
            <LineChart width={900} height={400} data={props.data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="humidity" stroke="#008000"/>
                <Line type="monotone" dataKey="ground_temp" stroke="#ff69b4"/>
                <Line type="monotone" dataKey="temp" stroke="#ffa500" activeDot={{r:8}}/>
                <Legend verticalAlign="bottom" height={36}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x"/>
                <YAxis label={{ value: 'Degrees F, % Humidity', angle: -90, position: 'insideLeft'}}/>
                <Tooltip />
            </LineChart>
            </div>
    )
}

export default TempChartReChart;

