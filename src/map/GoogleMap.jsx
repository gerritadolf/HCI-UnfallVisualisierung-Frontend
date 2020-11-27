import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react';

class GoogleMap extends Component {
    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={8}
                    position={{lat: 0, lng: 0}}
                >
                    <Marker onClick={console.log}
                            name={'Current location'}
                            position={{lat: 37.778519, lng: -122.405640}}/>
                    <Marker onClick={console.log}
                            name={'Zero Zero'}
                            position={{lat: 0, lng: 0}}/>

                    <InfoWindow onClose={console.log} onOpen={console.log} visible={true} position={{lat: 0, lng: 0}}>
                        <div>
                            <h1>Das ist ein InfoWindow</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

const LoadingContainer = (props) => (
    <div>Loading Map...</div>
)

export default GoogleApiWrapper({
    apiKey: (""),
    LoadingContainer
})(GoogleMap)