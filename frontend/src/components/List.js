import React from 'react';

export default function List({places}) {
    const executePlaces = async () =>{
        
    }



    const nameList = places.map(place => <h2>{place.name}</h2>)
  return (
    <div className='vertical-menu'>
    <h1 className='active'>Places</h1>
        {nameList}
    </div>);
}