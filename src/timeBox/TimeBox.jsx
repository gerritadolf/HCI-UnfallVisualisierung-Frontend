import React, {Component} from 'react';
import "./TimeBox.scss";
import ReactSlider from "react-slider";

class TimeBox extends Component {

    static viewSelection = {
        SLIDER: 0,
        DATE: 1,
        ID: 2
    }

    constructor(props) {
        super(props);
        this.state ={
            viewSelect: TimeBox.viewSelection.SLIDER
        }
    }

    valueToText(value) {
        const year = Math.floor(value);
        const quarter = (value - year) * 4 + 1;
        return `Q${quarter} ${year}`;
    }

    getSourceString = (value) => {
        const year = Math.floor(value)
        const quarter = (value - year) * 4 + 1;

        let startDate = new Date(`01 Jan ${year} 00:00:00 UTC`);
        let endDate = new Date(`31 Dec ${year} 00:00:00 UTC`);

        startDate.setMonth((quarter * 3) - 3, 1);
        endDate.setMonth((quarter * 3), 0);

        return `https://localhost:5001/accident/MapBox?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`;
    }

    sliderOnChange = (value) => {
        const {onChange} = this.props;

        const year = Math.floor(value)
        const quarter = (value - year) * 4 + 1;

        let startDate = new Date(`01 Jan ${year} 00:00:00 UTC`);
        let endDate = new Date(`31 Dec ${year} 00:00:00 UTC`);

        startDate.setMonth((quarter * 3) - 3, 1);
        endDate.setMonth((quarter * 3), 0);

        onChange(startDate, endDate);
    }

    render() {
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
                    onChange={this.sliderOnChange}
                />
            </div>
        );
    }
}

export default TimeBox;