import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  return <>
    <div>
      {rating !== 0 && <h3>{rating}</h3>}
    </div>
    <div>
      {rating === 0 ? <h3>Não Avaliado</h3> : [...Array(rating)].map((star, index) => {
        return <FaStar key={index} />
      })}
    </div>
  </>;
};

export default StarRating;