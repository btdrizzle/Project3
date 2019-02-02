import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import API from "./API";
require("dotenv").config();


class GoogleMapsContainer extends Component {
        constructor(props) {
            super(props);
            this.state = {
                showingInfoWindow: false,
                activeMarker: {},
                selectedPlace: {},
                stations: [],
            };
            this.onMarkerClick = this.onMarkerClick.bind(this);
            this.onMapClick = this.onMapClick.bind(this);
        }

      
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    
    
    onMapClick = (props) => {
        if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
            })
        }
    }
    onClose = (props) => {
        if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
            })
        }
    }
    componentDidMount() {
     
    API.stationQuery()
        .then(data => {
            this.setState({stations: data.data})
        })
    }
    render() {
        const mapStyles = {
            width: "100%",
            height: "80%"
        };
        return (
            <Map 
                google={this.props.google}
                onClick={this.onMapClick}
                xs={12}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                    lat: 29.70,
                    lng: -95.40
                }}
                >
{/*                 <Marker
                    onClick={this.onMarkerClick}
                    title={"Houston City Center"}
                    name={"Houston City Center"}
                    position={{
                        lat: 29.70,
                        lng: -95.40
                    }}
                /> */}
                {this.state.stations.map(station => (
                    <Marker
                    onClick={this.onMarkerClick}
                    title={station.name}
                    name={station.name}
                    position={{
                        lat: station.lat,
                        lng: station.lon
                    }}
                />
                ))}
                <InfoWindow
                    onClose={this.onClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h4>{this.state.activeMarker.name}</h4>
                        
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD_p6BYvedHTsL7tlZ4QUuz61IiuyDC9rU"
})(GoogleMapsContainer);