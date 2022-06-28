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
    <div
      className={
        display === 'grid' ? 'card__container' : 'card__container-list'
      }
    >
      <img
        className={display === 'grid' ? 'card__img' : 'card__img-list'}
        src={picture}
        alt="Kanye"
      />
      <img
        className={display === 'grid' ? 'card__thumbs' : 'card__thumbs-list'}
        style={
          negativePercentage > positivePercentage
            ? { background: '#FBBD4A' }
            : { background: '#3CBBB4' }
        }
        src={
          negativePercentage > positivePercentage
            ? images.thumbsDown
            : images.thumbsUp
        }
        alt="Thumbs Up"
      />
      <div
        className={display === 'grid' ? 'card__content' : 'card__content-list'}
      >
        <div
          className={
            display === 'grid' ? 'card__wrapper' : 'card__wrapper-list'
          }
        >
          <div
            className={display === 'grid' ? 'card__text' : 'card__text-list'}
          >
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div
            className={
              display === 'grid' ? 'card__buttons' : 'card__buttons-list'
            }
          >
            <p>1 month ago in {category}</p>
            <div
              className={
                display === 'grid'
                  ? 'card__buttons-group'
                  : 'card__buttons-group-list'
              }
            >
              <button
                className={
                  display === 'grid'
                    ? 'card__button-thumbsUp'
                    : 'card__button-thumbsUp-list'
                }
              >
                <img
                  onClick={() => console.log('ello')}
                  src={images.thumbsUp}
                  alt=" Thumbs Up"
                />
              </button>
              <button
                className={
                  display === 'grid'
                    ? 'card__button-thumbsDown'
                    : 'card__button-thumbsDown-list'
                }
              >
                <img src={images.thumbsDown} alt=" Thumbs Down" />
              </button>
              <button
                className={
                  display === 'grid'
                    ? 'card__button-vote'
                    : 'card__button-vote-list'
                }
              >
                Vote Now
              </button>
            </div>
          </div>
        </div>
        <div
          className={display === 'grid' ? 'card__gauge' : 'card__gauge-list'}
        >
          <div
            style={{ width: `${positivePercentage}%` }}
            className={
              display === 'grid'
                ? 'card__gauge-positive'
                : 'card__gauge-positive-list'
            }
          >
            <p>
              <span>
                <img src={images.thumbsUp} alt=" Thumbs Up" />
              </span>
              {positivePercentage}%
            </p>
          </div>
          <div
            className={
              display === 'grid'
                ? 'card__gauge-negative'
                : 'card__gauge-negative-list'
            }
            style={{ width: `${negativePercentage}%` }}
          >
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
