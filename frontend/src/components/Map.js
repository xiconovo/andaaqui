import React from 'react'
import { useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import mapStyles from './mapStyles.json';


const mapContainerStyle = {
    position: 'static!important',
    width: '70vw',
    height: 'calc(100vh-61px)'
};

const defaultMapOptions = {
    styles: mapStyles
};

function Map({ coordinates, setCord, place, center }) {
    const [marker, setMarker] = useState({});
    const [isMarked, setIsMarked] = useState(false);
    const [response, setResponse] = useState(null);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    const traceRoute = () => {
        if (coordinates && place) {
            setOrigin(coordinates);
            setDestination(place);
        }
    };

    const directionsServiceOptions = (() => {
        return {
            origin,
            destination,
            travelMode: 'DRIVING',
        };
    }, [origin, destination]);

    const directionsCallback = React.useCallback((res) => {
        if (res !== null && res.status === "OK") {
            setResponse(res);
        } else {
            console.log(res);
        }
    }, []);

    const directionsRendererOptions = React.useMemo(() => {
        return {
            directions: response,
        };
    }, [response]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAiJxWpyJiXusPV-h9JUAZ7J8Fno_M-etw"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                initialCenter={coordinates}
                center={center}
                clickableIcons={false}
                zoom={15}
                defaultOptions={defaultMapOptions}
                onClick={(event) => {
                    setCord({ lat: event.latLng.lat(), long: event.latLng.lng() })
                    setMarker({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        time: new Date(),
                    })
                    setIsMarked(true)
                }}
            >

                {isMarked && <Marker key={marker.time.toISOString()}
                    position={{ lat: marker.lat, lng: marker.lng }}
                />}

                {place != null && <Marker position={{ lat: place.lat, lng: place.long }} />}
            </GoogleMap>
            <button onClick={traceRoute}>Trace Route</button>
            {origin && destination && (
                <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />
            )}

            {response && directionsRendererOptions && (
                <DirectionsRenderer options={directionsRendererOptions} />
            )}
        </LoadScript>
    )
}

export default React.memo(Map)