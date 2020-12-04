import './App.scss';
import MapboxMap from "./mapboxMap/MapboxMap";
import React from "react";
import TimeBox from "./timeBox/TimeBox";

function App() {
    return (
        <div className="App">
            <MapboxMap/>
            <TimeBox/>
        </div>
    );
}

export default App;
