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

    async fetchData(postalCode, startDate, endDate){
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
        console.log("Mounted");
        this.fetchData(this.props.postal, this.props.startDate, this.props.endDate)
    }

    render() {
        console.log("Daten: ", this.state.accidentData);
        if(this.state.accidentData !== null) {
            return (
                <div>
                    <h1>{this.props.stateName} - Number of Accidents by Severity</h1>
                    <LineChart
                        width={400} height={250}
                        data={this.state.accidentData.accidentEvents}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                        <Line type="natural" dataKey="severityLevel1" stroke="rgb(115,172,224)"/>
                        <Line type="natural" dataKey="severityLevel2" stroke="rgb(253,219,199)"/>
                        <Line type="natural" dataKey="severityLevel3" stroke="rgb(239,138,98)"/>
                        <Line type="natural" dataKey="severityLevel4" stroke="rgb(178,24,43)"/>
                    </LineChart>
                </div>
            );
        } else {
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
        }
    }
}

export default StateDetails;