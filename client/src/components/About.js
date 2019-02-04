import React from "react";
import { Parallax, Background } from "react-parallax";
import station from "../station.jpg";
import stationBW from "../stationBW.png";
import rasPI from "../rasPI.jpg";
import "./style.css";

const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    borderRadius: 25,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    
  };

const About = () => (
    <div className="pt-4">
        <h2 className="display-4 pb-4">Weather Station Case Study</h2>
        <Parallax bgImage="/station.jpg" strength={500}>
            <div style={{ height: 500 }}>
                <div style={insideStyles}>
                    <h3>Purpose</h3>
                    <p>
                        The purpose of this project is to view data collected from a home amateur weather station - IoT device - 
                        "Big Data" is one of the hottest topics not just in technology but business as a whole.  Even weather data is 
                        so valuable that the historical weather data from The Weather Underground, once free to search, was acquired by IBM.
                        Data is arguably a company's greatest asset.
                    </p>
                </div>
            </div>        
        </Parallax>
        <div className="hr">
            <hr />
        </div>
        <Parallax bgImage="/rasPI.jpg" blur={{ min: -5, max: 5 }} strength={-500}>
            <div style={{ height: 500 }}>
                <div style={insideStyles}>
                    <h3>Method</h3>
                    <p>
                        I built a weather station with sensors including an assortment of electronic components and kit materials.
                        I connected these sensors to a Raspberry Pi to which to send data.  Python scripts on the Raspberry Pi
                        process this data and send it to a database every 5 minutes, where it can be accessed via web browser through 
                        charts.  For the Comparison chart, the Weatherbit.io API is utilized.
                    </p>
                </div>
            </div>        
        </Parallax>
        <div className="hr">
            <hr />
        </div>
        <Parallax bgImage="/stationBW.png" strength={500}>
            <div style={{ height: 500 }}>
                <div style={insideStyles}>
                    <h3>Moving Forward</h3>
                    <p>
                        There are currently numerous networks of amateur weather enthusiasts and data collectors.  A group
                        with a common interest could really benefit themselves with the right know-how and access to the 
                        right technology to cut the need for ties to the corporate Big Data owners and utilize data 
                        they've collected for their own use.
                    </p>
                </div>
            </div>        
        </Parallax>
        <div className="hrlast">
            <hr />
        </div>
    </div>
)

export default About;