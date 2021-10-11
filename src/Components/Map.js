import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import GeoJSON from "geojson";
import { useAuthState } from '../Context';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ({ coordinate }) => {

    const { host } = useAuthState()

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
                    'name': hitsArray[i]['name'],
                    'category': hitsArray[i]['category'],
                    'iconSize': [40, 40]
                });
            }

            return GeoJSON.parse(arr, {
                Point: ['latitude', 'longitude'],
                include: ['id', 'name', 'category', 'iconSize']
            });
        }

        const getData = async () => {
            let response = await fetch(`${host}/search?latitude=${coordinate.coords.latitude}&longitude=${coordinate.coords.longitude}`)
            let data = await response.json()
            data = convertToGeoJSON(data)

            setData(data)

        }

        const setData = (data) => {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [coordinate.coords.longitude, coordinate.coords.latitude],
                zoom: 13
            });

            map.on('load', () => {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': data
                });
                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'source': 'places',
                    'type': 'circle',
                    'paint': {
                        'circle-color': [
                            'match',
                            ['get', 'category'],
                            'Tempat Ibadah',
                            'orange',
                            'Kantor Pemerintah Kabupaten/Kota',
                            'blue',
                            'Rumah Sakit',
                            'red',
                            'purple'
                        ],
                        'circle-radius': 6,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff',
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
                    const category = e.features[0].properties.category;
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
                    popup.setLngLat(coordinates).setHTML(`<h1 class="text-center font-bold">${name}</h1><div>${category}</div>`).addTo(map);
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
            <div className="mt-3">
                <div className="flex gap-2 items-center mb-1">
                    <span className="bg-yellow-400 block rounded-full" style={{ width: "16px", height: "16px" }}></span>
                    <span>Tempat Ibadah</span>
                </div>
                <div className="flex gap-2 items-center mb-1">
                    <span className="bg-red-400 block rounded-full" style={{ width: "16px", height: "16px" }}></span>
                    <span>Rumah Sakit</span>
                </div>
                <div className="flex gap-2 items-center mb-1">
                    <span className="bg-blue-400 block rounded-full" style={{ width: "16px", height: "16px" }}></span>
                    <span>Kantor Pemerintah Kota/Kabupaten</span>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="bg-purple-400 block rounded-full" style={{ width: "16px", height: "16px" }}></span>
                    <span>Lain-Lain</span>
                </div>
            </div>
        </div>
    );
};

export default Map;