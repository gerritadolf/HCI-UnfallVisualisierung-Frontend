import React, {Component} from 'react';
import "./AccidentDetails.scss";
import WeatherIcon from "./weatherIcon/WeatherIcon";

class AccidentDetails extends Component {
    constructor() {
        super();
        this.state = {data: null};
    }

    componentDidMount() {
        const {id} = this.props;

        fetch("https://localhost:5001/accident/Event/" + id).then(async (r) => {
            if (r.status === 200) {
                let json = await r.json();
                this.setState({data: json});
            } else {
                //TODO failure handling
            }
        });
    }

    render() {
        const {id} = this.props;
        const {data} = this.state;
        console.log(data)
        //TODO Wetter: Windgeschwindigkeit/Windstärke (gibt es auch als Icon), Temperatur
        //TODO Allgemein: Traffic Signal, Railway und die ganzen anderen Booleans
        return (
            <div className={"accident-details"}>
                <h1>Accident Details {id}</h1>
                {
                    data === null
                        ? (
                            <div className={"accident-details__loading"}>Loading...</div>
                        )
                        : (<div>
                                <div className={"accident-details__weather"}>
                                    <WeatherIcon weatherName={data.weatherGroupName} dayNight={data.sunrise_Sunset}/>
                                    <p>{data.weather_Condition}</p>
                                    <div className={"accident-details__weather__content"}>
                                        Wind Speed: {data.wind_Speed || 0} mph | Temperature: {data.temperature} °F
                                    </div>
                                </div>
                                <p>
                                    Description: {
                                    data.description
                                }
                                </p>
                                <div className={"accident-details__columns"}>
                                    <div className={"accident-details__columns__column"}>
                                        <div className={"row"}>
                                            <div className={"left"}>Street:</div>
                                            <div className={"right"}>{data.street} {data.number}</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>City:</div>
                                            <div className={"right"}>{data.zipcode + " " + data.city}</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>County:</div>
                                            <div className={"right"}>{data.county}</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>State:</div>
                                            <div className={"right"}>{data.state}</div>
                                        </div>
                                    </div>
                                    <div className={"accident-details__columns__column"}>
                                        <div className={"row"}>
                                            <div className={"left"}>Date / Time:</div>
                                            <div className={"right"}>{
                                                `${(new Date(data.start_Time)).toLocaleDateString()}, ${(new Date(data.start_Time)).toLocaleTimeString()}`//TODO Passt die Zeitzone?
                                            }</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>Timezone:</div>
                                            <div className={"right"}>{data.timezone}</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>Severity:</div>
                                            <div className={"right"}>{data.serverity}</div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"left"}>Source:</div>
                                            <div className={"right"}>{data.source}</div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.crossing && <p>This accident occured on a crossing.</p>
                                }
                                {
                                    data.roundabout && <p>This accident occured in a roundabout.</p>
                                }
                                {
                                    data.railway && <p>This accident occured on a railway.</p>
                                }
                                {
                                    data.traffic_Signal && <p>This accident occured on a traffic signal.</p>
                                }
                                {
                                    data.turning_Loop && <p>This accident occured on a turning loop.</p>
                                }
                                {
                                    data.station && <p>This accident occured on a station.</p>
                                }
                                {
                                    data.junction && <p>This accident occured on a junction.</p>
                                }
                                {
                                    data.bump && <p>This accident was a bump accident.</p>
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}

export default AccidentDetails;