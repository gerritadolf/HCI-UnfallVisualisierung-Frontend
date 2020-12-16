import React, {Component} from 'react';
import wind from "./svg/wi-windy.svg";
import volcano from "./svg/wi-volcano.svg";
import tornado from "./svg/wi-tornado.svg";
import thunderstorm from "./svg/wi-thunderstorm.svg";
import snow from "./svg/wi-snow.svg";
import fog from "./svg/wi-fog.svg";
import sand from "./svg/wi-sandstorm.svg";
import rain from "./svg/wi-rain.svg";
import cloudy from "./svg/wi-cloudy.svg";
import hail from "./svg/wi-hail.svg";
// import clear from "./svg/wi-sun.svg"; TODO
import smoke from "./svg/wi-smoke.svg";
import dust from "./svg/wi-dust.svg";
import na from "./svg/wi-na.svg";
import "./WeatherIcon.scss";

class WeatherIcon extends Component {
    render() {
        const {weatherName} = this.props;

        let svg;
        switch (weatherName) {
            case "Windy":
                //TODO Windstärke
                svg = wind;
                break;
            case "Volcano Ash":
                svg = volcano;
                break;
            case "Tornado":
                svg = tornado;
                break;
            case "Thunderstorm":
                svg = thunderstorm;
                break;
            case "Snow":
                svg = snow;
                break;
            case "Fog":
                svg = fog;
                break;
            case "Sand":
                svg = sand;
                break;
            case "Rain":
                svg = rain;
                break;
            case "Cloudy":
                svg = cloudy;
                break;
            case "Hail":
                svg = hail;
                break;
            case "Clear":
                svg = na; //TODO
                break;
            case "Unspecified":
                svg = na;
                break;
            case "Smoke":
                svg = smoke;
                break;
            case "Dust":
                svg = dust;
                break;
            default:
                svg = na;
                break;
        }

        return (
            <img className={"weather-icon"} src={svg} alt={"WeatherIcon"}/>
        );
    }
}

export default WeatherIcon;