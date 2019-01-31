import React from "react";

function ChoiceBlock(props) {
    return(
        <div className="choose">
        <label className="dropDown">
            <select value={props.value} onChange={props.handleChange} name="displayChart" className="form-control">
                <option className="option">Which Chart Would You Like?</option>
                    <option className="option" value="Temperature and Humidity">Temperature and Humidity</option>
                    <option className="option" value="Wind Speed and Direction">Wind Speed and Direction</option>
                    <option className="option" value="Barometric Pressure">Barometric Pressure</option>
                    <option className="option" value="Rainfall">Rainfall</option>
                    <option className="option" value="Wind Gust">Wind Gust</option>
                    <option className="option" value="Comparison Chart">Comparison Chart</option>

            </select>
        </label>
    </div>
    )
}


export default ChoiceBlock;