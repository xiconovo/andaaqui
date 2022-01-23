import React from 'react'
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const mapContainerStyle = {
    position: 'static!important',
    width: '70vw',
    height: '100vh'
};

function Map({ coordinates }) {
    const [markers, setMarkers] = useState([]);


    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAiJxWpyJiXusPV-h9JUAZ7J8Fno_M-etw"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={coordinates}
                clickableIcons={false}
                zoom={15}
                onClick={(event) => {

                    setMarkers(current => [...current, {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        time: new Date(),
                    }])
                }}
            >
                {/* {markers.map(marker => (
                    <Marker key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />
                ))} */}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)