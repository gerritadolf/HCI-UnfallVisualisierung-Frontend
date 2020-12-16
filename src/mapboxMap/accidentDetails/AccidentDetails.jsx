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
                <h1>Unfall Details {id}</h1>
                {
                    data === null
                        ? (
                            <div className={"accident-details__loading"}>Loading...</div>
                        )
                        : (<div>
                            <p>
                                Datum / Uhrzeit: {
                                    (new Date(data.start_Time)).toLocaleDateString() + ", " + (new Date(data.start_Time)).toLocaleTimeString()//TODO Passt die Zeitzone?
                                }
                            </p>
                            <p>
                                Beschreibung: {
                                    data.description
                                }
                            </p>
                            <p>
                                Quelle: {
                                    data.source
                                }
                            </p>
                                <div className={"accident-details__geo"}>
                                    <h2>Geografische Informationen</h2>
                                    <p>Straße: {data.street}</p>
                                    <p>Stadt: {data.zipcode + " " + data.city}</p>
                                    <p>County: {data.county}</p>
                                    <p>Bundesstaat: {data.state}</p>
                                </div>
                                <div className={"accident-details__weather"}>
                                    <h2>Wetterbedingungen</h2>
                                    <div className={"accident-details__weather__content"}>
                                        <WeatherIcon weatherName={data.weatherGroupName}/>
                                        {data.weather_Condition}
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default AccidentDetails;