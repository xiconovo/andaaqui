import StarRating from "./StarRating";
import { FaTimes } from 'react-icons/fa'


const Place = ({ place, selectPlace }) => {
    return (
        <div className="headerPlace">
            <div style={{textAlign: "right"}}>
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => selectPlace(null)}
                />
            </div>
            <p className="namePlace">
                {place.name}
                <StarRating rating={0} />
                {/* <StarRating rating={place.rating}/> */}
            </p>
            <p>Adicionar a uma Lista</p>
            <p>Direções</p>
            <p>Comentários</p>
        </div>
    );
};

export default Place;
