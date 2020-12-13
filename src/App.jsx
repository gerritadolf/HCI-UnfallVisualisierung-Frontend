import './App.scss';
import MapboxMap from "./mapboxMap/MapboxMap";
import React from "react";
import TimeBox from "./timeBox/TimeBox";
import Menu from "./menu/Menu";

function App() {
    return (
        <div className="App">
            <MapboxMap/>
            <TimeBox/>
            <Menu/>
        </div>
    );
}

export default App;
