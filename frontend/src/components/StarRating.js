import {FaStar} from 'react-icons/fa';

const StarRating = ({rating}) => {
  return <> 
    <div>
      {rating !== 0 && <h1>{rating}</h1>}
      </div>
      <div>
      {rating === 0 ? <h1>Não Avaliado</h1> : [...Array(rating)].map((star) => {
          return <FaStar />
      })}
      </div>
  </>;
};

export default StarRating;