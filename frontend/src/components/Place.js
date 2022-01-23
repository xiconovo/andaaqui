import StarRating from "./StarRating";
import { FaTimes } from 'react-icons/fa'


const Place = ({place, selectPlace}) => {
    return (
        <div className="headerPlace">
            <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => selectPlace(null)}
            />
            <h1 className="namePlace">
                {place.name}
                <StarRating rating={0}/>
                {/* <StarRating rating={place.rating}/> */}
            </h1>
                <h1>Comentários</h1>
            <h1>Adicionar a uma Lista</h1>
            <h1>Direções</h1>
        </div>
    );
};

export default Place;
