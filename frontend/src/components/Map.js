import React from 'react'
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import mapStyles from './mapStyles.json';


const mapContainerStyle = {
    position: 'static!important',
    width: '70vw',
    height: 'calc(100vh-61px)'
};

const defaultMapOptions = {
    styles: mapStyles
};

function Map({ coordinates, setCord }) {
    const [marker, setMarker] = useState({});
    const [isMarked, setIsMarked] = useState(false);


    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAiJxWpyJiXusPV-h9JUAZ7J8Fno_M-etw"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={coordinates}
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

            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)