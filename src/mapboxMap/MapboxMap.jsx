import React from 'react';
import mapboxgl from 'mapbox-gl';
import "./MapboxMap.css";
import {addPopup} from "../helper/mapHelper";
import StateDetails from "./stateDetails/StateDetails";
import AccidentDetails from "./accidentDetails/AccidentDetails";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNnbzk3IiwiYSI6ImNraTRyaHkzNTAyNzgzM24ydG45dnVkc3oifQ.X3ChHgCMZxbD3yEPNDkr9A'; // public token

export default class MapboxMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -95.712891,
            lat: 37.090240,
            zoom: 4.5
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            // style: 'mapbox://styles/mapbox/streets-v11',
            style: 'mapbox://styles/jonasgo97/cki60o3iv19te19pi2hc48lki',
            // style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on("load", () => {
            console.log("map loaded")

            // Coordinates in the upper left corner
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });


            // States
            map.addSource("states", {
                "type": "geojson",
                "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
            });

            map.addLayer({
                "id": "state-fills",
                "type": "fill",
                "source": "states",
                "layout": {},
                "paint": {
                    "fill-opacity": 0
                }
            });

            map.on("click", function (e) {
                let features = map.queryRenderedFeatures(e.point, {layers: ["state-fills", "earthquakes-point"]});
                if (features.length) {
                    let feature = features.find(f => f.layer.id === "earthquakes-point")
                    if (feature) {
                        // Show point popup
                        addPopup(e.lngLat, map, (
                            <div>
                                <AccidentDetails/>
                            </div>
                        ))
                    } else {
                        feature = features.find(f => f.layer.id === "state-fills")
                        if (feature) {
                            // Show state popup
                            let name = features[0].properties.name

                            addPopup(e.lngLat, map, (
                                <div>
                                    <StateDetails stateName={name}/>
                                </div>
                            ))
                        }
                    }
                }
            });

            //
            // map.addLayer({
            //     "id": "state-borders",
            //     "type": "line",
            //     "source": "states",
            //     "layout": {},
            //     "paint": {
            //         "line-color": "#627BC1",
            //         "line-width": 2
            //     }
            // });
            //
            // map.addLayer({
            //     "id": "state-fills-hover",
            //     "type": "fill",
            //     "source": "states",
            //     "layout": {},
            //     "paint": {
            //         "fill-color": "#627BC1",
            //         "fill-opacity": 1
            //     },
            //     "filter": ["==", "name", ""]
            // });

            // When the user moves their mouse over the page, we look for features
            // at the mouse position (e.point) and within the states layer (states-fill).
            // If a feature is found, then we'll update the filter in the state-fills-hover
            // layer to only show that state, thus making a hover effect.
            // map.on("mousemove", function(e) {
            //     var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
            //     if (features.length) {
            //         map.getCanvas().style.cursor = 'pointer';
            //         map.setFilter("state-fills-hover", ["==", "name", features[0].properties.name]);
            //     } else {
            //         map.setFilter("state-fills-hover", ["==", "name", ""]);
            //         map.getCanvas().style.cursor = '';
            //     }
            // });

            // Reset the state-fills-hover layer's filter when the mouse leaves the map
            // map.on("mouseout", function() {
            //     map.getCanvas().style.cursor = 'auto';
            //     map.setFilter("state-fills-hover", ["==", "name", ""]);
            // });

            //earthquakes source
            map.addSource('earthquakes', {
                type: 'geojson',
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data:
                    'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                // cluster: true,
                // clusterMaxZoom: 14, // Max zoom to cluster points on
                // clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });


            // // earthquakes cluster
            // map.addLayer({
            //     id: 'clusters',
            //     type: 'circle',
            //     source: 'earthquakes',
            //     filter: ['has', 'point_count'],
            //     paint: {
            //         // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            //         // with three steps to implement three types of circles:
            //         //   * Blue, 20px circles when point count is less than 100
            //         //   * Yellow, 30px circles when point count is between 100 and 750
            //         //   * Pink, 40px circles when point count is greater than or equal to 750
            //         'circle-color': [
            //             'step',
            //             ['get', 'point_count'],
            //             '#51bbd6',
            //             100,
            //             '#f1f075',
            //             750,
            //             '#f28cb1'
            //         ],
            //         'circle-radius': [
            //             'step',
            //             ['get', 'point_count'],
            //             20,
            //             100,
            //             30,
            //             750,
            //             40
            //         ]
            //     }
            // });
            //
            // map.addLayer({
            //     id: 'cluster-count',
            //     type: 'symbol',
            //     source: 'earthquakes',
            //     filter: ['has', 'point_count'],
            //     layout: {
            //         'text-field': '{point_count_abbreviated}',
            //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            //         'text-size': 12
            //     }
            // });
            //
            // map.addLayer({
            //     id: 'unclustered-point',
            //     type: 'circle',
            //     source: 'earthquakes',
            //     filter: ['!', ['has', 'point_count']],
            //     paint: {
            //         'circle-color': '#11b4da',
            //         'circle-radius': 4,
            //         'circle-stroke-width': 1,
            //         'circle-stroke-color': '#fff'
            //     }
            // });
            //
            // // inspect a cluster on click
            // map.on('click', 'clusters', function (e) {
            //     var features = map.queryRenderedFeatures(e.point, {
            //         layers: ['clusters']
            //     });
            //     var clusterId = features[0].properties.cluster_id;
            //     map.getSource('earthquakes').getClusterExpansionZoom(
            //         clusterId,
            //         function (err, zoom) {
            //             if (err) return;
            //
            //             map.easeTo({
            //                 center: features[0].geometry.coordinates,
            //                 zoom: zoom
            //             });
            //         }
            //     );
            // });
            //
            // // When a click event occurs on a feature in
            // // the unclustered-point layer, open a popup at
            // // the location of the feature, with
            // // description HTML from its properties.
            // map.on('click', 'unclustered-point', function (e) {
            //     var coordinates = e.features[0].geometry.coordinates.slice();
            //     var mag = e.features[0].properties.mag;
            //     var tsunami;
            //
            //     if (e.features[0].properties.tsunami === 1) {
            //         tsunami = 'yes';
            //     } else {
            //         tsunami = 'no';
            //     }
            //
            //     // Ensure that if the map is zoomed out such that
            //     // multiple copies of the feature are visible, the
            //     // popup appears over the copy being pointed to.
            //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            //     }
            //
            //     new mapboxgl.Popup()
            //         .setLngLat(coordinates)
            //         .setHTML(
            //             'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
            //         )
            //         .addTo(map);
            // });
            //
            // map.on('mouseenter', 'clusters', function () {
            //     map.getCanvas().style.cursor = 'pointer';
            // });
            // map.on('mouseleave', 'clusters', function () {
            //     map.getCanvas().style.cursor = '';
            // });


            // earthquakes heatmap
            map.addLayer(
                {
                    'id': 'earthquakes-heat',
                    'type': 'heatmap',
                    'source': 'earthquakes',
                    'maxzoom': 9,
                    'paint': {
                        // Increase the heatmap weight based on frequency and property magnitude
                        'heatmap-weight': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            0,
                            0,
                            6,
                            1
                        ],
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            1,
                            9,
                            3
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(33,102,172,0)',
                            0.2,
                            'rgb(103,169,207)',
                            0.4,
                            'rgb(209,229,240)',
                            0.6,
                            'rgb(253,219,199)',
                            0.8,
                            'rgb(239,138,98)',
                            1,
                            'rgb(178,24,43)'
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            2,
                            9,
                            20
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            1,
                            9,
                            0
                        ]
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    'id': 'earthquakes-point',
                    'type': 'circle',
                    'source': 'earthquakes',
                    'minzoom': 7,
                    'paint': {
                        // Size circle radius by earthquake magnitude and zoom level
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            7,
                            ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                            16,
                            ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                        ],
                        // Color circle by earthquake magnitude
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            1,
                            'rgba(33,102,172,0)',
                            2,
                            'rgb(103,169,207)',
                            3,
                            'rgb(209,229,240)',
                            4,
                            'rgb(253,219,199)',
                            5,
                            'rgb(239,138,98)',
                            6,
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
        });
    }

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer'/>
            </div>
        )
    }
}
