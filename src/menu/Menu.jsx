import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames";
import "./Menu.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, contentWindow: null};
    }


    render() {
        const {visible, contentWindow} = this.state;
        const {onCoronaChange, onElectionChange} = this.props;

        return [
            <div className={"menu"}>
                <div className={"menu__indicator"} onClick={() => {
                    this.setState({visible: !visible})
                }}>
                    <FontAwesomeIcon icon={faBars}/>
                </div>
                <div className={classNames("menu__list", {"menu__list--visible": visible})}>
                    <div className={"menu__list__item"} onClick={onCoronaChange}>
                        Corona Layer
                    </div>
                    <div className={"menu__list__item"} onClick={onElectionChange}>
                        Election Results 2020 Layer
                    </div>
                    <div className={"menu__list__item"} onClick={() => {
                        this.setState({
                            contentWindow: (
                                <div className={"content"}>
                                    <h2>Data Sources</h2>
                                    <p>Accident data: <a
                                        href={"https://www.kaggle.com/sobhanmoosavi/us-accidents"}>https://www.kaggle.com/sobhanmoosavi/us-accidents</a>
                                    </p>

                                    <p>2020 Presidential Election data: <a
                                        href={"https://cookpolitical.com/2020-national-popular-vote-tracker"}>https://cookpolitical.com/2020-national-popular-vote-tracker</a>
                                    </p>

                                    <p>US Covid Data: <a
                                        href={"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports_us"}>https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports_us</a>
                                    </p>
                                </div>
                            )
                        })
                    }}>
                        Data Sources
                    </div>
                    <div className={"menu__list__item"} onClick={() => {
                        this.setState({
                            contentWindow: (
                                <div className={"content"}>
                                    <h2>Used Software</h2>
                                    <h3>Frontend</h3>
                                    <ul>
                                        <li><a href={"https://reactjs.org/" } target={"__blank"}>React</a></li>
                                        <li><a href={"https://www.mapbox.com/"} target={"__blank"}>Mapbox Web GL</a></li>
                                        <li><a href={"https://github.com/JedWatson/classnames"} target={"__blank"}>classnames</a></li>
                                        <li><a href={"https://github.com/recharts/recharts"} target={"__blank"}>recharts</a></li>
                                        <li><a href={"https://fontawesome.com/"} target={"__blank"}>Font Awesome Free</a></li>
                                        <li>
                                            <a href={"https://github.com/erikflowers/weather-icons"}>weather-icons</a>
                                        </li>
                                    </ul>
                                    <h3>Backend & Database</h3>
                                    <ul>
                                        <li><a href={"https://dotnet.microsoft.com/download"} target={"__blank"}>ASP.NET Core 3.1</a></li>
                                        <li><a href={"https://dapper-tutorial.net/dapper"} target={"__blank"}>Dapper</a></li>
                                        <li><a href={"https://www.mysql.com/de/"} target={"__blank"}>MySQL</a></li>
                                    </ul>
                                </div>
                            )
                        })
                    }}>
                        Software
                        </div>
                        </div>
                        </div>,
                        <div className={classNames("content-window", {"content-window--invisible": contentWindow === null})}>
                        <div className={"content-window__inner-wrapper"}>
                        <div className={"close"} onClick={() => {
                        this.setState({contentWindow: null})
                        }}>
                        <FontAwesomeIcon icon={faTimes}/>
                        </div>
                        {
                        contentWindow
                        }
                        </div>
                        </div>
                        ];
                        }
                        }

                        export default Menu;
