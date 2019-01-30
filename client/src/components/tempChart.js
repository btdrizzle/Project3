import React, { Component } from "react";
var CanvasJSReact = require("../canvasjs.react");
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TempChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const options = {
            width: 800,
            animationEnabled: true,
            title: {
                text: "JV Weather Station Temp Data"
            },
            axisX: {
                title: "Time of Day"
            },
            axisY: {
                title: "Temperature",
                minimum: 0,
                maximum: 110,
                prefix: "F"
            },
            data: [{
                type: "spline",
                dataPoints: this.props.dataPoints
            }]
        }
        return(
        <CanvasJSChart options = {options} />
    )}
}


export default TempChart;