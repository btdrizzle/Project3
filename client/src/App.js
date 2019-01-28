import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./components/Header";
import About from "./components/About";
import Stations from "./components/Stations";
import Charts from "./components/Charts";
import "./components/style.css"

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header />
        <div id="body">
          <Route exact path="/" component={About} />
          <Route exact path="/stations" component={Stations} />
          <Route exact path="/charts" component={Charts} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
