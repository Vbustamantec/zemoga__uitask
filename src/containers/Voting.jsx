import React, { useEffect } from 'react';

import './Voting.scss';
import Card from '../components/Card';
import { useGlobalContext } from '../context/GlobalContextProvider';

const Voting = () => {
  const { display, setDisplay, getData, candidates, setCandidates } = useGlobalContext();

  useEffect(() => {
    getData().then((data) => {
      setCandidates(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    console.log(display);
  }, [display]);

  return (
    <div className="voting__container">
      <div className="voting__header">
        <h2>Previous Rulings</h2>
        <select onChange={(e) => setDisplay(e.target.value)} name="display" id="display">
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
      <div
        className={`voting__card-container  ${display === 'grid' ? 'voting__container-grid' : ''}`}
      >
        {candidates.map(({ id, name, category, description, picture, votes }) => (
          <Card
            key={id}
            name={name}
            category={category}
            description={description}
            picture={picture}
            votes={votes}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Voting;
