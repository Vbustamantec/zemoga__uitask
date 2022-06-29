import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

import { images } from '../../constants';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { useSize } from '../../hooks/useSize';
import db from '../../firebase/firebaseConfig';
import './Card.scss';

function Card({ id, name, category, description, picture, votes: { negative, positive } }) {
  const { display } = useGlobalContext();
  const [width] = useSize();
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);
  const [positiveVotes, setPositiveVotes] = useState(positive);
  const [negativeVotes, setNegativeVotes] = useState(negative);
  const [voteSelected, setVoteSelected] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const handlePercentages = () => {
    const totalVotes = positiveVotes + negativeVotes;

    const negPercentage = (negativeVotes * 100) / totalVotes;
    const finalNegPercentage = negPercentage.toFixed(2);

    const posPercentage = (positiveVotes * 100) / totalVotes;
    const finalPostPercentage = posPercentage.toFixed(2);

    setNegativePercentage(finalNegPercentage);
    setPositivePercentage(finalPostPercentage);
  };

  useEffect(() => {
    handlePercentages();
  }, []);

  useEffect(() => {
    handlePercentages();
  }, [positiveVotes, negativeVotes]);

  const handleOption = (vote) => {
    if (voteSelected === vote) {
      setVoteSelected('');
    } else {
      setVoteSelected(vote);
    }
  };

  const handleVote = () => {
    const docRef = doc(db, 'candidates', id);
    if (!hasVoted) {
      setHasVoted(!hasVoted);

      if (voteSelected === 'thumbsDown') {
        setNegativeVotes((prevVotes) => prevVotes + 1);
        updateDoc(docRef, {
          votes: {
            positive: positiveVotes,
            negative: negativeVotes + 1,
          },
        });
      } else if (voteSelected === 'thumbsUp') {
        setPositiveVotes((prevVotes) => prevVotes + 1);
        updateDoc(docRef, {
          votes: {
            positive: positiveVotes + 1,
            negative: negativeVotes,
          },
        });
      }
    } else {
      setHasVoted(!hasVoted);
      setVoteSelected('');
    }
  };

  return (
    <div
      className={
        display === 'grid' && width > 600
          ? 'card__container desktop'
          : display === 'list' && width > 600
          ? 'card__container-list'
          : 'card__container mobile'
      }
    >
      <img className="card__img" src={picture} alt={name} />
      <img
        className="card__thumbs"
        style={
          negativePercentage > positivePercentage
            ? { background: '#FBBD4A' }
            : negativePercentage === positivePercentage ||
              (negativePercentage === 0 && positivePercentage === 0)
            ? { background: '#AFAFAF' }
            : { background: '#3CBBB4' }
        }
        src={
          negativePercentage > positivePercentage
            ? images.thumbsDown
            : negativePercentage === positivePercentage ||
              (negativePercentage === 0 && positivePercentage === 0)
            ? images.mid
            : images.thumbsUp
        }
        alt={negativePercentage > positivePercentage ? 'Thumbs Down' : 'Thumbs Up'}
      />
      <div className="card__content">
        <div className="card__wrapper">
          <div className="card__text">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="card__buttons">
            {!hasVoted ? (
              <>
                <p>
                  1 month ago in
                  {category}
                </p>
                <div className="card__buttons-group">
                  <button
                    type="button"
                    className={`card__button-thumbsUp ${
                      voteSelected === 'thumbsUp' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsUp')}
                  >
                    <img src={images.thumbsUp} alt=" Thumbs Up" />
                  </button>
                  <button
                    type="button"
                    className={`card__button-thumbsDown ${
                      voteSelected === 'thumbsDown' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsDown')}
                  >
                    <img src={images.thumbsDown} alt=" Thumbs Down" />
                  </button>
                  <button
                    type="button"
                    disabled={voteSelected === ''}
                    className="card__button-vote"
                    onClick={() => handleVote()}
                  >
                    Vote Now
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Thank you for your vote!</p>
                <div className="card__buttons-group">
                  <button type="button" className="card__button-vote" onClick={() => handleVote()}>
                    Vote Again
                  </button>
                </div>
              </>
            )}
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
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  votes: PropTypes.shape({
    negative: PropTypes.number.isRequired,
    positive: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
