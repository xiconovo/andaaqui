import React from 'react';
import Map from './Map';
import List from './List';
import useGeoLocation from './useGeoLocation';

const MapList = () => {

    const location = useGeoLocation();
  return <div className='mapalista'>
      <Map coordinates={location.coordinates}/>
      <List coordinates={location.coordinates}/>
  </div>;
};

export default MapList;
