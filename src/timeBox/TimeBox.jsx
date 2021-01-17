import React, {Component} from 'react';
import "./TimeBox.scss";
import ReactSlider from "react-slider";
import {getAvailableFilters} from "../helper/filterHelper";

class TimeBox extends Component {

    static viewSelection = {
        SLIDER: 0,
        DATE: 1,
    }

    startDate = null;
    endDate = null;
    selectedFilters = [];

    constructor(props) {
        super(props);
        this.state = {
            viewSelect: TimeBox.viewSelection.SLIDER,
            filters: null
        }
        getAvailableFilters().then((filters) => {
            this.setState({filters});
        })
        this.sliderOnChange(2016)
    }

    valueToText(value) {
        const year = Math.floor(value);
        const quarter = (value - year) * 4 + 1;
        return `Q${quarter} ${year}`;
    }

    sliderOnChange = (value) => {
        const year = Math.floor(value)
        const quarter = (value - year) * 4 + 1;

        this.startDate = new Date(`01 Jan ${year} 00:00:00 UTC`);
        this.endDate = new Date(`31 Dec ${year} 00:00:00 UTC`);

        this.startDate.setMonth((quarter * 3) - 3, 1);
        this.endDate.setMonth((quarter * 3), 0);
    }

    checkboxOnChange = (event) => {
        if (event.target.checked) {
            this.selectedFilters.push(event.target.value);
        } else {
            this.selectedFilters.splice(this.selectedFilters.indexOf(event.target.value), 1);
        }
    };

    render() {
        const {viewSelect, filters} = this.state;
        return (
            <div className={"time-box"}>
                <div className={"filters"}>
                    <h3>Filters</h3>
                    <div className={"filter-wrapper"}>
                        {
                            filters === null ||
                            (
                                Object.keys(filters).map((filter) => (
                                    <div className={"filter"}>
                                        <input type="checkbox" id={filters[filter]} value={filters[filter]}
                                               onChange={this.checkboxOnChange}/>
                                        <label htmlFor={filters[filter]}>{filter}</label>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <select onChange={(result) => {
                    this.setState({viewSelect: parseInt(result.target.value, 10)});
                }}>
                    <option value={TimeBox.viewSelection.SLIDER}>Quarter Time Slider</option>
                    <option value={TimeBox.viewSelection.DATE}>Select Date</option>
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
                        <div className={"select-dates"}>
                            <div className={"select-date"}>
                                <label htmlFor="start">Start date:</label>
                                <input type="date" id="start"
                                       min="2016-01-01" max="2020-12-31" ref={(ref) => this.startRef = ref}
                                       onInput={(event) => {
                                           this.startDate = new Date(`${event.target.value} 00:00:00 UTC`)
                                       }}/>
                            </div>
                            <div className={"select-date"}>
                                <label htmlFor="end">End date:</label>
                                <input type="date" id="end"
                                       min="2016-01-01" max="2020-12-31" ref={(ref) => this.endRef = ref}
                                       onInput={(event) => {
                                           this.endDate = new Date(`${event.target.value} 00:00:00 UTC`)
                                       }}/>
                            </div>
                        </div>
                    )
                }
                <button onClick={() => {
                    const {onChange} = this.props;

                    if (this.startDate && this.endDate) {
                        if (this.startDate > this.endDate) {
                            alert("The start date has to be before the end date.")
                        }
                    } else if (this.startDate) {
                        this.endDate = this.startDate;
                    } else if (this.endDate) {
                        this.startDate = this.endDate;
                    } else {
                        alert("Please select a date.")
                        return;
                    }

                    let filters = 0;
                    for (const index in (this.selectedFilters)) {
                        filters = filters | parseInt(this.selectedFilters[index], 10);
                    }

                    console.log(filters, this.selectedFilters)

                    onChange(this.startDate, this.endDate, filters)
                }}>Load Accidents
                </button>
            </div>
        );
    }
}

export default TimeBox;