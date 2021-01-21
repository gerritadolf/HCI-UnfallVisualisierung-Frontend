import React, {Component} from 'react';
import "./StateDetails.scss";
import {Line, LineChart, Legend, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {getStateData} from "../../helper/urlHelper";
import Loader from 'react-loader-spinner'

class StateDetails extends Component {
    data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    async fetchData(postalCode, startDate, endDate) {
        const response = await fetch(getStateData(postalCode, startDate, endDate));
        const json = await response.json();
        this.setState({accidentData: json});

    }

    constructor(props) {
        super(props);
        this.state = {
            accidentData: null
        }
    }

    componentDidMount() {
        if (this.props.startDate !== null || this.props.endDate !== null) {
            this.fetchData(this.props.postal, this.props.startDate, this.props.endDate)
        } else {
            this.fetchData(this.props.postal, new Date(2016, 1, 1), new Date(2016, 4, 1));
        }
    }

    render() {
        console.log("Daten: ", this.state.accidentData);
        if (this.state.accidentData !== null && this.state.accidentData.accidentEvents.length > 0) {
            return (
                <div>
                    <h1>{this.props.stateName} - Number of Accidents by Severity</h1>
                    <LineChart
                        width={600} height={375}
                        data={this.state.accidentData.accidentEvents}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                        <Line name="Severity 1" type="linear" dataKey="severityLevel1" stroke="rgb(115,172,224)"
                              strokeWidth={3}/>
                        <Line name="Severity 2" type="linear" dataKey="severityLevel2" stroke="#ffc107"
                              strokeWidth={3}/>
                        <Line name="Severity 3" type="linear" dataKey="severityLevel3" stroke="#ff5722"
                              strokeWidth={3}/>
                        <Line name="Severity 4" type="linear" dataKey="severityLevel4" stroke="rgb(178,24,43)"
                              strokeWidth={3}/>
                    </LineChart>
                </div>
            );
        } else if(this.state.accidentData === null){
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Loader
                        type="ThreeDots"
                        color="#000000"
                        height={100}
                        width={100}
                        timeout={10000} //10 secs
                    />
                </div>
            );
        } else {
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>No Data found</h1>
                </div>
            );
        }
    }
}

export default StateDetails;