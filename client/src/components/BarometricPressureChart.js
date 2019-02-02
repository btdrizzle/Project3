import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./style.css";

function BarometricPressureChart(props) {
    return(
            <div>
            <h3 className="text-center">Last 10 Barometric Pressure Readings at Weather Station</h3>
            <BarChart width={900} height={400} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="x"/>
                <YAxis tick={false} domain={['datamin', 'datamax']} label={{ value: 'Barometric Pressure', angle: -90, position: 'insideLeft'}}/>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
                <Bar dataKey="pressure" fill="#800080" />
                </BarChart>
            </div>
    )
}

export default BarometricPressureChart;