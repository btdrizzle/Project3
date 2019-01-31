import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function RainChart(props) {
    return(
        <div>
        <h3 className="text-center">Last 10 Rain Guage Readings at Weather Station</h3>
        <BarChart width={900} height={400} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="x"/>
            <YAxis label={{ value: 'Rainfall', angle: -90, position: 'insideLeft'}}/>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
            <Bar dataKey="rainfall_amt" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

export default RainChart;