import React from 'react';
import Map from './Map';
import List from './List';
import Place from './Place'
import useGeoLocation from './useGeoLocation';
import { useState } from 'react'

const MapList = () => {
  const [cordinates, setCordinates] = useState({ lat: 0, lng: 0 })
  const location = useGeoLocation(setCordinates);
  const [center, setCenter] = useState({ lat: location.coordinates.lat, lng: location.coordinates.lng })
  const [radius, setRadius] = useState(1)
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [showDirections, setShowDirections] = useState(false)

  const executeSearchPlaces = async (coord, radius) => {
    console.log("SearchPlaces", coord, radius)
    const res = await fetch('http://localhost:8080/places/search', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ lat: cordinates.lat, long: cordinates.lng, radius }),
    })
    console.log("RES", res)
    if (res.status === 200) {
      const data = await res.json()
      console.log("Places search", data.places)
      setPlaces(data.places)
    }
  }

  const searchPlaces = () => {
    console.log(cordinates)
    executeSearchPlaces(cordinates, radius)
  }




  return <div className='mapalista'>
    <div className='mapbody'>
      <Map coordinates={cordinates} setCord={setCordinates} place={selectedPlace} center={center} showDirections={showDirections}/>
      {selectedPlace != null && <Place place={selectedPlace} selectPlace={setSelectedPlace} trace={setShowDirections}/>}
    </div>
    <div className='listbody'>
      <div style={{ display: "flex" }}>
        <div>
          <input
            type="number"
            className='input-radius'
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <b>KM</b>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div style={{ textAlign: "right" }}>
            <button className='submit-button search-button' onClick={searchPlaces}>Search</button>
          </div>
        </div>
      </div>
      <List places={places} selectPlace={setSelectedPlace} setCenter={setCenter} />
    </div>

  </div>;
};

export default MapList;
