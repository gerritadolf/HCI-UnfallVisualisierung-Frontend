import React, {Component} from 'react';
import "./StateDetails.scss";
import {Line, LineChart, Legend, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

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

    accidentData = (startDate, endDate) => {

    }

    render() {
        return (
            <div>
                <h1>{this.props.stateName} - Number of Accidents by Severity</h1>
                <LineChart
                    width={400} height={250}
                    data={this.data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Line type="natural" dataKey="uv" stroke="rgb(115,172,224)"/>
                    <Line type="natural" dataKey="uv" stroke="rgb(253,219,199)"/>
                    <Line type ="natural" dataKey="pv" stroke="rgb(239,138,98)"/>
                    <Line type="natural" dataKey="amt" stroke="rgb(178,24,43)"/>
                </LineChart>
            </div>
        );
    }
}

export default StateDetails;