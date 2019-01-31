import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function WindGust(props) {
    return(
        <div>
        <h3 className="text-center">Last 10 Wind Gust Readings at Weather Station</h3>
        <BarChart width={900} height={400} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="x"/>
            <YAxis label={{ value: 'Wind Gust km/h', angle: -90, position: 'insideLeft'}}/>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
            <Bar dataKey="wind_gust" fill="#ff7f50" />
            </BarChart>
        </div>
    )
}

export default WindGust;