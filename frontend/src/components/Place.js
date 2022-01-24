import StarRating from "./StarRating";
import { FaTimes } from 'react-icons/fa'


const Place = ({ place, selectPlace, trace}) => {
    return (
        <div className="headerPlace">
            <div style={{ textAlign: "right" }}>
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => {selectPlace(null);trace(false) }}
                />
            </div>
            <p className="namePlace">
                {place.name}
                <StarRating rating={place.rating} />
            </p>
            <p>Adicionar a uma Lista</p>
            <p onClick={() => {console.log("set trace");trace(true)}}>Direções</p>
            <p>Comentários</p>
        </div>
    );
};

export default Place;
