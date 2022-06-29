import React, { useEffect } from 'react';

import './Voting.scss';
import Card from '../components/Card';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { useSize } from '../hooks/useSize';

function Voting() {
  const {
    display, setDisplay, getData, candidates, setCandidates,
  } = useGlobalContext();
  const [width] = useSize();

  useEffect(() => {
    getData().then((data) => {
      setCandidates(data);
    });
  }, []);

  return (
    <section className="voting__container">
      <div className="voting__header">
        <h2>Previous Rulings</h2>
        <select onChange={(e) => setDisplay(e.target.value)} name="display" id="display">
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
      <div
        className={`voting__card-container  ${
          display === 'grid' && width > 600 ? 'voting__container-grid' : ''
        } `}
      >
        {candidates.map(({
          id, name, category, description, picture, votes,
        }) => (
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
    </section>
  );
}

export default Voting;
