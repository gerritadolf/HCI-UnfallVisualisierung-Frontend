import React, {Component} from 'react';
import "./TimeBox.scss";
import ReactSlider from "react-slider";

class TimeBox extends Component {

    valueToText(value) {
        const year = Math.floor(value);
        const quarter = (value - year) * 4 + 1;
        return `Q${quarter} ${year}`;
    }

    render() {
        const {onChange} = this.props;
        return (
            <div className={"time-box"}>
                Time Slider
                <ReactSlider
                    className="time-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    renderThumb={(props, state) => <div {...props}>{this.valueToText(state.valueNow)}</div>}
                    min={2016}
                    max={2020}
                    step={0.25}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default TimeBox;