export default function List({ places, selectPlace, setCenter }) {
  const dblClick = (place) => {
    setCenter({ lat: place.lat, lng: place.long })
  }


  const nameList = places.map(place => <h2 key={place.id} onDoubleClick={() => { dblClick(place) }} onClick={() => { selectPlace(place) }}>{place.name}</h2>)
  return (
    <div className='vertical-menu'>
      <h1 className='active'>Places</h1>
      {nameList}
    </div>);
}