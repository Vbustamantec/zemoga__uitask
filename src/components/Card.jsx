import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import './Card.scss';
import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalContextProvider';
import db from '../firebase/firebaseConfig';

const Card = ({ id, name, category, description, picture, votes }) => {
  const { display } = useGlobalContext();
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);
  const [positiveVotes, setPositiveVotes] = useState(votes.positive);
  const [negativeVotes, setNegativeVotes] = useState(votes.negative);
  const [voteSelected, setVoteSelected] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    handlePercentages();
  }, []);

  const handleOption = (vote) => {
    if (voteSelected === vote) {
      setVoteSelected('');
    } else {
      setVoteSelected(vote);
      console.log(vote);
    }
  };

  const handlePercentages = () => {
    const totalVotes = positiveVotes + negativeVotes;

    const negPercentage = (negativeVotes * 100) / totalVotes;
    const finalNegPercentage = negPercentage.toFixed(2);

    const posPercentage = (positiveVotes * 100) / totalVotes;
    const finalPostPercentage = posPercentage.toFixed(2);

    setNegativePercentage(finalNegPercentage);
    setPositivePercentage(finalPostPercentage);
  };

  const handleVote = () => {
    const docRef = doc(db, 'candidates', id);
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
  };

  useEffect(() => {
    handlePercentages();
  }, [positiveVotes, negativeVotes]);

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
            {!hasVoted ? (
              <>
                <p>1 month ago in {category}</p>
                <div className="card__buttons-group">
                  <button
                    className={`card__button-thumbsUp ${
                      voteSelected === 'thumbsUp' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsUp')}
                  >
                    <img src={images.thumbsUp} alt=" Thumbs Up" />
                  </button>
                  <button
                    className={`card__button-thumbsDown ${
                      voteSelected === 'thumbsDown' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsDown')}
                  >
                    <img src={images.thumbsDown} alt=" Thumbs Down" />
                  </button>
                  <button
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
                  <button className="card__button-vote" onClick={() => setHasVoted(!hasVoted)}>
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
};

export default Card;
