import React, {Component} from 'react';
import "./TimeBox.scss";
import ReactSlider from "react-slider";

class TimeBox extends Component {
    render() {
        return (
            <div className={"time-box"}>
                Zeitleiste
                <ReactSlider
                    className="time-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    min={2016}
                    max={2020}
                />
            </div>
        );
    }
}

export default TimeBox;