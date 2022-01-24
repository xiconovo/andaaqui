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
            <p className="info">Adicionar a uma Lista</p>
            <p className="info" onClick={() => { console.log("set trace"); trace(true) }}>Direções</p>
            <p className="info"> Comentários</p>
        </div>
    );
};

export default Place;
