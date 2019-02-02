import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import "./style.css";

function WindChart(props) {
/*     const data = [
        {wind_direction: "N", A: 5,B: 2,C: 1, D: 1},
        {wind_direction: "NE", A: 50,B: 10,C: 5, D: 1},
        {wind_direction: "E", A: 10,B: 40,C: 5, D: 1},
        {wind_direction: "SE", A: 5,B: 5,C: 5, D: 10},
        {wind_direction: "S", A: 5,B: 5,C: 5, D: 6},
        {wind_direction: "SW", A: 5,B:1 ,C: 50, D: 6},
        {wind_direction: "W", A: 5,B: 10,C: 2, D: 50},
        {wind_direction: "NW", A: 5,B: 1,C: 5, D: 50},
    ] */
    
    return(
        <div>
            <h3 className="text-center">Wind Speed and Direction Radar Chart Today</h3>
            <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="wind_direction" />
                <PolarRadiusAxis angle={22.5} />
                <Radar name="0-5 km/h" dataKey="A" stroke="#008000" fill="#008000" fillOpacity={0.6}/>
                <Radar name="6-10 km/h " dataKey="B" stroke="#800080" fill="#800080" fillOpacity={0.6}/>
                <Radar name="11-15 km/h" dataKey="C" stroke="#ff69b4" fill="#ff69b4" fillOpacity={0.6}/>
                <Radar name="> 15 km/h" dataKey="D" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6}/>
                <Legend />
            </RadarChart>
        </div>
    )
}

export default WindChart;