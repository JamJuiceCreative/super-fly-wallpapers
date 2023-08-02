import React from 'react';
import FlyIcon from '../assets/fly-icon.svg';
import FlyIconHalf from '../assets/fly-icon-half.svg';
import FlyIconEmpty from '../assets/fly-icon-empty.svg';

function Rating(props) {
  const { rating, numReviews, caption } = props;

  const getFlyIcon = (filled) => {
    return filled ? <FlyIcon /> : <FlyIconEmpty />;
  };

  const getFlyIconHalf = () => {
    return <FlyIconHalf />;
  };

  return (
    <div className="rating d-flex">
      <span>
        {rating >= 1
          ? <img src={FlyIcon} alt="Fly Icon" className="fly-rating" />
          : rating >= 0.5
          ? <img src={FlyIconHalf} alt="Half Fly Icon" className="fly-rating" />
          : <img src={FlyIconEmpty} alt="Empty Fly Icon" className="fly-rating" />}
      </span>
      <span>
        {rating >= 2
          ? <img src={FlyIcon} alt="Fly Icon" className="fly-rating" />
          : rating >= 1.5
          ? <img src={FlyIconHalf} alt="Half Fly Icon" className="fly-rating" />
          : <img src={FlyIconEmpty} alt="Empty Fly Icon" className="fly-rating" />}
      </span>
      <span>
        {rating >= 3
          ? <img src={FlyIcon} alt="Fly Icon" className="fly-rating" />
          : rating >= 2.5
          ? <img src={FlyIconHalf} alt="Half Fly Icon" className="fly-rating" />
          : <img src={FlyIconEmpty} alt="Empty Fly Icon" className="fly-rating" />}
      </span>
      <span>
        {rating >= 4
          ? <img src={FlyIcon} alt="Fly Icon" className="fly-rating" />
          : rating >= 3.5
          ? <img src={FlyIconHalf} alt="Half Fly Icon" className="fly-rating" />
          : <img src={FlyIconEmpty} alt="Empty Fly Icon" className="fly-rating" />}
      </span>
      <span>
        {rating >= 5
          ? <img src={FlyIcon} alt="Fly Icon" className="fly-rating" />
          : rating >= 4.5
          ? <img src={FlyIconHalf} alt="Half Fly Icon" className="fly-rating" />
          : <img src={FlyIconEmpty} alt="Empty Fly Icon" className="fly-rating" />}
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' ratings'}</span>
      )}
    </div>
  );
}

export default Rating;
