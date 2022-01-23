import React from 'react';
import Map from './Map';
import List from './List';
import useGeoLocation from './useGeoLocation';
import { useState } from 'react'

const MapList = () => {
  const location = useGeoLocation();
  const [cordinates, setCordinates] = useState({ lat: location.coordinates.lat, long: location.coordinates.lng })
  const [radius, setRadius] = useState(1)
  const [places, setPlaces] = useState([])

  const executeSearchPlaces = async (coord, radius) => {
    console.log("SearchPlaces", coord, radius)
    const res = await fetch('http://localhost:8080/places/search', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...coord, radius }),
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
    <Map coordinates={location.coordinates} setCord={setCordinates} />
    <div>
      <div style={{display: "flex"}}>
        <div>
          <input
            type="number"
            className='input-radius'
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <b>KM</b>
        </div>
        <div style={{marginLeft: "auto"}}>
          <div style={{textAlign: "right"}}>
            <button className='submit-button search-button'onClick={searchPlaces}>Search</button>
          </div>
        </div>
      </div>
      <List places={places} />
    </div>

  </div>;
};

export default MapList;
