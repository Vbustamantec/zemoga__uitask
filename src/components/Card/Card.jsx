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

  /* State to determine the gauge percentage of every card */
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);

  /* State to calculate the percentage and the count of the votes for every card */
  const [positiveVotes, setPositiveVotes] = useState(positive);
  const [negativeVotes, setNegativeVotes] = useState(negative);

  /* State that determines if the user has voted already in a card and which vote did he picked */
  const [voteSelected, setVoteSelected] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  //This function will update the gauge bar percentages on page load and every time a vote is casted
  const handlePercentages = () => {
    //Get the total amount of votes for the calculation
    const totalVotes = positiveVotes + negativeVotes;

    //Calculate the % of negative and positive votes
    const negPercentage = (negativeVotes * 100) / totalVotes;
    const finalNegPercentage = negPercentage.toFixed(2);

    const posPercentage = (positiveVotes * 100) / totalVotes;
    const finalPostPercentage = posPercentage.toFixed(2);

    //Set the percentage states to display in the gauge bar
    setNegativePercentage(finalNegPercentage);
    setPositivePercentage(finalPostPercentage);
  };

  /* This function handles which vote are you selecting => "thumbsDown" or "thumbsUp" */
  const handleOption = (vote) => {
    /* If the button is already selected it will unselect it */
    if (voteSelected === vote) {
      setVoteSelected('');
    } else {
      setVoteSelected(vote);
    }
  };

  // handle the entire logic of the vote updating the data in the server and reflecting the data in the gauge bar
  const handleVote = () => {
    // Reference from the document in the firebase DB
    const docRef = doc(db, 'candidates', id);

    //If the user hasn't voted it will update the doc in the DB
    if (!hasVoted) {
      setHasVoted(!hasVoted);

      //Depending on the vote selected will update the doc with a positive or negative vote
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

      //If the user has voted already it will restore all the buttons to their default values and texts
    } else {
      setHasVoted(!hasVoted);
      setVoteSelected('');
    }
  };

  useEffect(() => {
    handlePercentages();
  }, []);

  useEffect(() => {
    handlePercentages();
  }, [positiveVotes, negativeVotes]);

  return (
    <div
      className={
        display === 'grid' && width > 425
          ? 'card__container '
          : display === 'list' && width > 425
          ? 'card__container-list'
          : 'card__container'
      }
    >
      <img className="card__img" src={picture} alt={`${name} image`} />
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
                <p>1 month ago in {category}</p>
                <div className="card__buttons-group">
                  <button
                    type="button"
                    className={`card__button-thumbsUp ${
                      voteSelected === 'thumbsUp' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsUp')}
                  >
                    <img src={images.thumbsUp} alt=" Thumbs Up button" />
                  </button>
                  <button
                    type="button"
                    className={`card__button-thumbsDown ${
                      voteSelected === 'thumbsDown' ? 'button-selected' : ''
                    }`}
                    onClick={() => handleOption('thumbsDown')}
                  >
                    <img src={images.thumbsDown} alt=" Thumbs Down button" />
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
          {positivePercentage > 0 || negativePercentage > 0 ? (
            <>
              {positivePercentage > 0 ? (
                <div style={{ width: `${positivePercentage}%` }} className="card__gauge-positive">
                  <p>
                    <span>
                      <img src={images.thumbsUp} alt=" Thumbs Up" />
                    </span>
                    {positivePercentage}%
                  </p>
                </div>
              ) : (
                ''
              )}
              {negativePercentage > 0 ? (
                <div className="card__gauge-negative" style={{ width: `${negativePercentage}%` }}>
                  <p>
                    <span>
                      <img src={images.thumbsDown} alt=" Thumbs Up" />
                    </span>
                    {negativePercentage}%
                  </p>
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            <div className="card__gauge-empty">
              <p>There are no votes yet</p>
            </div>
          )}
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
