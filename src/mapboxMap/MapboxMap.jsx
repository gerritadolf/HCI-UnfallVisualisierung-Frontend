import React from 'react';
import mapboxgl from 'mapbox-gl';
import "./MapboxMap.css";
import {addPopup} from "../helper/mapHelper";
import StateDetails from "./stateDetails/StateDetails";
import AccidentDetails from "./accidentDetails/AccidentDetails";
import TimeBox from "../timeBox/TimeBox";
import Menu from "../menu/Menu";
import {electionResults} from "../data/election2020";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNnbzk3IiwiYSI6ImNraTRyaHkzNTAyNzgzM24ydG45dnVkc3oifQ.X3ChHgCMZxbD3yEPNDkr9A'; // public token

export default class MapboxMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -95.712891,
            lat: 37.090240,
            zoom: 4.5,
            startDate: null,
            endDate: null,
        };
        this.map = null;
        this.showCoronaLayer = false;
        this.showElectionLayer = false;
    }


    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/jonasgo97/cki60o3iv19te19pi2hc48lki',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        this.map.on("load", () => {

            // Coordinates in the upper left corner
            this.map.on('move', () => {
                this.setState({
                    lng: this.map.getCenter().lng.toFixed(4),
                    lat: this.map.getCenter().lat.toFixed(4),
                    zoom: this.map.getZoom().toFixed(2)
                });
            });


            // States
            this.map.addSource("states", {
                type: "geojson",
                data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
            });

            this.map.addLayer({
                "id": "state-fills",
                "type": "fill",
                "source": "states",
                "layout": {},
                "paint": {
                    "fill-opacity": 0,
                }
            });

            this.map.on("click", (e) => {
                let features = this.map.queryRenderedFeatures(e.point, {layers: ["state-fills", "accident-point"]});
                if (features.length) {
                    let feature = features.find(f => f.layer.id === "accident-point")
                    if (feature) {
                        // Show point popup
                        addPopup(e.lngLat, this.map, (
                            <AccidentDetails id={feature.properties.Id}/>
                        ))
                    } else {
                        feature = features.find(f => f.layer.id === "state-fills")
                        if (feature) {
                            // Show state popup
                            let name = features[0].properties.name;
                            let postalCode = features[0].properties.postal;

                            addPopup(e.lngLat, this.map, (
                                <StateDetails stateName={name} startDate={this.state.startDate}
                                              endDate={this.state.endDate} postal={postalCode}/>
                            ))
                        }
                    }
                }
            });

            //accident source
            this.map.addSource('accident', {
                type: 'geojson',
                data: this.getSourceString(new Date(2016, 1, 1), new Date(2016, 4, 1)),
                // cluster: true,
                // clusterMaxZoom: 14, // Max zoom to cluster points on
                // clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            // accident heatmap
            this.map.addLayer(
                {
                    'id': 'accident-heat',
                    'type': 'heatmap',
                    'source': 'accident',
                    'maxzoom': 9,
                    'paint': {
                        'heatmap-weight': {
                            property: 'Serverity',
                            type: 'exponential',
                            stops: [ // first value: severity, second value: weight
                                [1, 0],
                                [4, 1]
                            ]
                        },
                        // increase intensity as zoom level increases
                        'heatmap-intensity': {
                            stops: [ // first value: zoom level, second value: intensity multiplier
                                [11, 1],
                                [15, 2]
                            ]
                        },
                        // assign color values be applied to points depending on their density
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0, 'rgba(253,219,199,0)',
                            0.2, 'rgb(252,238,231)',
                            0.4, 'rgb(253,219,199)',
                            0.6, 'rgb(248,188,152)',
                            0.8, 'rgb(239,138,98)',
                            1, 'rgb(178,24,43)'
                        ],
                        // increase radius as zoom increases
                        'heatmap-radius': {
                            stops: [ // first value: zoom level, second value: radius
                                [4, 5],
                                [8, 20]
                            ]
                        },
                        // decrease opacity to transition into the circle layer
                        'heatmap-opacity': {
                            default: 1,
                            stops: [//first value: zoom level, second value: opacity
                                [8, 1],
                                [9, 0]
                            ]
                        },
                    }
                },
                'waterway-label'
            );

            this.map.addLayer(
                {
                    'id': 'accident-point',
                    'type': 'circle',
                    'source': 'accident',
                    'minzoom': 7,
                    'paint': {
                        // Size circle radius by earthquake magnitude and zoom level
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            ['interpolate', ['linear'], ['get', 'Serverity'], 1, 1, 6, 4],
                            16,
                            ['interpolate', ['linear'], ['get', 'Serverity'], 1, 5, 6, 50]
                        ],
                        // Color circle by earthquake magnitude
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'Serverity'],
                            1,
                            'rgb(115,172,224)',
                            2,
                            'rgb(253,219,199)',
                            3,
                            'rgb(239,138,98)',
                            4,
                            'rgb(178,24,43)'
                        ],
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 1,
                        // Transition from heatmap to circle layer by zoom level
                        'circle-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            0,
                            8,
                            1
                        ]
                    }
                },
                'waterway-label'
            );

            this.updateCoronaLayer();
        });
    }

    getSourceString = (startDate, endDate, filter) => {
        if (!filter) {
            filter = 0;
        }
        return `https://localhost:5001/accident/MapBox?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}&filter=${filter}`;
    }

    onChange = (startDate, endDate, filters) => {
        console.log("Values (onChange): ", startDate, endDate);
        this.map.getSource('accident').setData(this.getSourceString(startDate, endDate, filters));
        this.setState({startDate: startDate});
        this.setState({endDate: endDate});
        this.updateCoronaLayer();
    }

    getCoronaColorArray = (data) => {
        const returnArray = ['match', ['get', 'postal']];

        for (const key in data) {
            const value = data[key];
            returnArray.push(key);
            switch (true) {
                case value > 1000:
                    returnArray.push('#D60000');
                    break;
                case value > 900:
                    returnArray.push('#DA1A0B');
                    break;
                case value > 800:
                    returnArray.push('#DE3315');
                    break;
                case value > 700:
                    returnArray.push('#E24D20');
                    break;
                case value > 600:
                    returnArray.push('#E6662B');
                    break;
                case value > 500:
                    returnArray.push('#EB8036');
                    break;
                case value > 400:
                    returnArray.push('#EF9940');
                    break;
                case value > 300:
                    returnArray.push('#F3B34B');
                    break;
                case value > 200:
                    returnArray.push('#F7CC56');
                    break;
                case value > 100:
                    returnArray.push('#FBE660');
                    break;
                default:
                    returnArray.push('#FFFF6B');
                    break;
            }
        }
        returnArray.push('#ffffff');
        return returnArray;
    }

    updateCoronaLayer = () => {
        const {startDate, endDate} = this.state;
        if (this.showCoronaLayer) {
            const data = {CA: 100, NY: 500, TX: 700, NV: 30, OR: 0};//TODO FETCH DATA
            this.map.addLayer({
                    'id': 'corona',
                    'type': 'fill',
                    'source': 'states',
                    'paint': {
                        'fill-color': this.getCoronaColorArray(data),
                        'fill-opacity': 0.5,
                    }
                },
                'accident-heat');
        } else {
            this.map.removeLayer("corona")
        }
    }

    getElectionLayer = (data) => {
        const returnArray = ['match', ['get', 'postal']];

        for (const key in data) {
            const value = data[key];
            returnArray.push(value.state);
            if (value.trumpVotes > value.bidenVotes) {
                returnArray.push("#D81C28");
            } else {
                returnArray.push("#019BD8");
            }
        }
        returnArray.push('#ffffff');
        return returnArray;
    }

    updateElectionLayer = () => {
        if (this.showElectionLayer) {
            this.map.addLayer({
                    'id': 'election',
                    'type': 'fill',
                    'source': 'states',
                    'paint': {
                        'fill-color': this.getElectionLayer(electionResults),
                        'fill-opacity': 0.5,
                    }
                },
                'accident-heat');
        } else {
            this.map.removeLayer("election")
        }
    }

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer'/>
                <TimeBox onChange={this.onChange}/>
                <Menu onCoronaChange={() => {
                    this.showCoronaLayer = !this.showCoronaLayer;
                    this.updateCoronaLayer();
                }} onElectionChange={() => {
                    this.showElectionLayer = !this.showElectionLayer;
                    this.updateElectionLayer();
                }}/>
            </div>
        )
    }
}
