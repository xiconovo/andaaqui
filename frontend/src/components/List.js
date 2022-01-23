export default function List({ places, selectPlace }) {
  const nameList = places.map(place => <h2 key={place.id} onClick={() => { console.log(place); selectPlace(place) }}>{place.name}</h2>)
  return (
    <div className='vertical-menu'>
      <h1 className='active'>Places</h1>
      {nameList}
    </div>);
}