import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function ComparisonChart(props) {
    return(
        <div>
        <h3 className="text-center">High and Low Temp Today so Far Compared to {props.location}</h3>
        <BarChart width={900} height={400} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis label={{ value: "Temp F", angle: -90, position: 'insideLeft'}}/>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
            <Bar dataKey="highTemp" fill="#8884d8" />
            <Bar dataKey="lowTemp" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

export default ComparisonChart;