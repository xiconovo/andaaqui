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

function Map({ coordinates, setCord, place, center, showDirections }) {
    const [marker, setMarker] = useState({});
    const [isMarked, setIsMarked] = useState(false);
    const [response, setResponse] = useState(null);

    const directionsServiceOptions = React.useMemo(() => {
        if (place != null) {
            return {
                origin: { lat: coordinates.lat, lng: coordinates.lng },
                destination: { lat: place.lat, lng: place.long },
                travelMode: 'DRIVING',
            };
        }
    }, [coordinates, place]);

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
        <>
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
                        setCord({ lat: event.latLng.lat(), lng: event.latLng.lng() })
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

                    {response && showDirections && <DirectionsRenderer options={directionsRendererOptions} />}

                    {showDirections && (
                        <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />)}

                </GoogleMap>

            </LoadScript>
        </>
    )
}

export default React.memo(Map)