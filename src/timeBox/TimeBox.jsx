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
        this.state = {
            viewSelect: TimeBox.viewSelection.SLIDER
        }
    }

    valueToText(value) {
        const year = Math.floor(value);
        const quarter = (value - year) * 4 + 1;
        return `Q${quarter} ${year}`;
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
        const {viewSelect} = this.state;
        console.log(viewSelect)
        return (
            <div className={"time-box"}>
                <select onChange={(result) => {
                    this.setState({viewSelect: parseInt(result.target.value, 10)});
                }}>
                    <option value={TimeBox.viewSelection.SLIDER}>Quarter Time Slider</option>
                    <option value={TimeBox.viewSelection.DATE}>Select Date</option>
                    <option value={TimeBox.viewSelection.ID}>ID Search</option>
                </select>
                {
                    viewSelect === TimeBox.viewSelection.SLIDER && (
                        <div>
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
                    )
                }
                {
                    viewSelect === TimeBox.viewSelection.DATE && (
                        <div>
                            <label htmlFor="start">Start date:</label>
                            <input type="date" id="start"
                                   min="2016-01-01" max="2020-12-31" ref={(ref) => this.startRef = ref}/>
                            <br/>
                            <label htmlFor="end">End date:</label>
                            <input type="date" id="end"
                                   min="2016-01-01" max="2020-12-31" ref={(ref) => this.endRef = ref}/>
                            <br/>
                            <button onClick={() => {
                                const {onChange} = this.props;
                                let start = this.startRef.value;
                                let end = this.endRef.value;

                                if (start && end) {
                                    if(new Date(start)>new Date(end)){
                                        alert("The start date has to be before the end date.")
                                    }
                                } else if (start) {
                                    end = start;
                                } else if (end) {
                                    start = end;
                                } else {
                                    alert("Please select a date.")
                                    return;
                                }


                                let startDate = new Date(`${start} 00:00:00 UTC`);
                                let endDate = new Date(`${end} 23:59:59 UTC`);
                                onChange(startDate, endDate)

                            }}>Load accidents
                            </button>
                        </div>
                    )
                }
                {
                    viewSelect === TimeBox.viewSelection.ID && (
                        <div>

                        </div>
                    )
                }
            </div>
        );
    }
}

export default TimeBox;