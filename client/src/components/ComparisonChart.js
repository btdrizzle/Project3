import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function ComparisonChart(props) {
    return(
        <div>
        <h3 className="text-center">High and Low Temp So Far Today Compared to {props.location}</h3>
        <BarChart width={900} height={400} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis label={{ value: "Temp F", angle: -90, position: 'insideLeft'}}/>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
            <Bar dataKey="highTemp" fill="#da9100" />
            <Bar dataKey="lowTemp" fill="#4b0082" />
            </BarChart>
        </div>
    )
}

export default ComparisonChart;