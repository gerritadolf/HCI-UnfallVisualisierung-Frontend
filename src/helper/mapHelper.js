import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

export function addPopup(lngLat, map, component) {
    const placeholder = document.createElement('div');
    ReactDOM.render(component, placeholder);

    new mapboxgl.Popup()
        .setDOMContent(placeholder)
        .setLngLat(lngLat)
        .addTo(map);
}