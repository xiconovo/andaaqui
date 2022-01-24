import StarRating from "./StarRating";
import { FaTimes } from 'react-icons/fa'


const Place = ({ place, selectPlace, trace }) => {
    return (
        <div className="headerPlace">
            <div style={{ textAlign: "right" }}>
                <FaTimes
                    style={{ color: 'black', cursor: 'pointer' }}
                    onClick={() => { selectPlace(null); trace(false) }}
                />
            </div>
            <div className="namePlace">
                    {place.name}
            </div>
            <StarRating rating={place.rating} />
            <p className="info">Add to a List</p>
            <p className="info" onClick={() => { console.log("set trace"); trace(true) }}>Trace Route</p>
            <p className="info">Comment</p>
        </div>
    );
};

export default Place;
