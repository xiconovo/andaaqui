import StarRating from "./StarRating";



const Place = (props) => {
    return (
        <div className="headerPlace">
            <h1 className="namePlace">
                {props.name}
                <StarRating rating={props.rating}/>
            </h1>
                <h1>Comentários</h1>
            <h1>Adicionar a uma Lista</h1>
            <h1>Direções</h1>
        </div>
    );
};

export default Place;
