import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {
    return(
        <div className="header sticky-top">
            <h1 className="display-3">{"{Data and API} from Weather"}</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/stations" className={window.location.pathname === "/stations" ? "nav-link active" : "nav-link"}>Weather Stations</Link>
                </li>
                <li className="nav-item">
                    <Link to="/charts" className={window.location.pathname === "/charts" ? "nav-link active" : "nav-link"}>Charts</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;