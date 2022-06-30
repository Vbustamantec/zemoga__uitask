import React, { useEffect } from 'react';

import './Voting.scss';
import Card from '../../components/Card/Card';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { useSize } from '../../hooks/useSize';

function Voting() {
  const { display, setDisplay, getData, candidates, setCandidates } = useGlobalContext();
  const [width] = useSize();

  useEffect(() => {
    getData().then((data) => {
      setCandidates(data);
    });
  }, []);

  return (
    <section aria-labelledby="voting-section" className="voting__container">
      <header className="voting__header">
        <h2 id="voting-section">Previous Rulings</h2>
        <select onChange={(e) => setDisplay(e.target.value)} name="display" id="display">
          <option aria-label="grid display" value="grid">
            Grid
          </option>
          <option aria-label="list display" value="list">
            List
          </option>
        </select>
      </header>
      <div
        className={`voting__card-container  ${
          display === 'grid' && width > 425 ? 'voting__container-grid' : ''
        } `}
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
    </section>
  );
}

export default Voting;
