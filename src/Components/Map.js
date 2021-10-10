import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import GeoJSON from "geojson";

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {

        const convertToGeoJSON = (obj) => {
            var arr = [];
            var hitsArray = obj;
            for (var i = 0; i < hitsArray.length; i++) {
                arr.push({
                    'id': hitsArray[i]['id'],
                    'latitude': hitsArray[i]['latitude'],
                    'longitude': hitsArray[i]['longitude'],
                    'name': hitsArray[i]['name']
                });
            }

            return GeoJSON.parse(arr, {
                Point: ['latitude', 'longitude'],
                include: ['id', 'name']
            });
        }

        const getData = () => {

            navigator.geolocation.getCurrentPosition(async (position) => {
                let response = await fetch(`http://localhost:8000/api/search?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
                let data = await response.json()
                data = convertToGeoJSON(data)
    
                setData(data, position)
            })

        }

        const setData = (data, position) => {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 14
            });

            map.on('load', () => {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': data
                });
                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'circle',
                    'source': 'places',
                    'paint': {
                        'circle-color': '#4264fb',
                        'circle-radius': 6,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff'
                    }
                });

                // Create a popup, but don't add it to the map yet.
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                map.on('mouseenter', 'places', (e) => {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const name = e.features[0].properties.name;
                    // const name = e[0].name;
                    // const latitude = e[0].latitude;
                    // const longitude = e[0].longitude;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    // while (Math.abs(e.lngLat.lng - latitude) > 180) {
                    //     latitude += e.lngLat.lng > latitude ? 360 : -360;
                    // }

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(name).addTo(map);
                });

                map.on('mouseleave', 'places', () => {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });
            });
        }

        getData()

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div style={{
                position: "relative",
                width: "100%",
                height: "25rem",
                left: "0",
                right: "0"
            }} ref={mapContainerRef} />
        </div>
    );
};

export default Map;