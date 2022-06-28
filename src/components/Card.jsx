import React, { useEffect, useState } from 'react';

import './Card.scss';
import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalContextProvider';

const Card = ({ id, name, category, description, picture, votes }) => {
  const { display } = useGlobalContext();
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);

  useEffect(() => {
    const totalVotes = votes.positive + votes.negative;

    const negPercentage = (votes.negative * 100) / totalVotes;
    const finalNegPercentage = negPercentage.toFixed(2);

    const posPercentage = (votes.positive * 100) / totalVotes;
    const finalPostPercentage = posPercentage.toFixed(2);

    setNegativePercentage(finalNegPercentage);
    setPositivePercentage(finalPostPercentage);
  }, []);

  return (
    <div className={display === 'grid' ? 'card__container' : 'card__container-list'}>
      <img className="card__img" src={picture} alt={name} />
      <img
        className="card__thumbs"
        style={
          negativePercentage > positivePercentage
            ? { background: '#FBBD4A' }
            : { background: '#3CBBB4' }
        }
        src={negativePercentage > positivePercentage ? images.thumbsDown : images.thumbsUp}
        alt={negativePercentage > positivePercentage ? 'Thumbs Down' : 'Thumbs Up'}
      />
      <div className="card__content">
        <div className="card__wrapper">
          <div className="card__text">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="card__buttons">
            <p>1 month ago in {category}</p>
            <div className="card__buttons-group">
              <button className="card__button-thumbsUp">
                <img onClick={() => console.log('ello')} src={images.thumbsUp} alt=" Thumbs Up" />
              </button>
              <button className="card__button-thumbsDown">
                <img src={images.thumbsDown} alt=" Thumbs Down" />
              </button>
              <button className="card__button-vote">Vote Now</button>
            </div>
          </div>
        </div>
        <div className="card__gauge">
          <div style={{ width: `${positivePercentage}%` }} className="card__gauge-positive">
            <p>
              <span>
                <img src={images.thumbsUp} alt=" Thumbs Up" />
              </span>
              {positivePercentage}%
            </p>
          </div>
          <div className="card__gauge-negative" style={{ width: `${negativePercentage}%` }}>
            <p>
              <span>
                <img src={images.thumbsDown} alt=" Thumbs Up" />
              </span>
              {negativePercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
