import React from 'react';

import { images } from '../../constants';
import './BannerVote.scss';

const BannerVote = () => {
  return (
    <aside className="banner banner-bottom" role="doc-tip" aria-label="Submit a name">
      <img
        srcSet={`${images.bgPeople} 750w, ${images.bgPeopleBig} 1440w`}
        sizes="(min-width: 750px) 1440px, 100vw"
        className="banner__background"
        src={images.bgPeople}
        alt=""
        role="none"
      />
      <div className="banner__left">
        <h2 className="banner__heading">Is there anyone else you would want us to add?</h2>
      </div>
      <div className="banner__right">
        <button type="button" className="banner__cta">
          Submit a name
        </button>
      </div>
    </aside>
  );
};

export default BannerVote;
