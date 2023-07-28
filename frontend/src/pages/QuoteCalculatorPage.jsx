// QuoteCalculatorPage.jsx
import React, { useState } from 'react';

const QuoteCalculatorPage = () => {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const squareMeterPrice = 15; // Replace this with the actual price from your object model

  const calculateQuote = () => {
    const area = length * height;
    const quote = area * squareMeterPrice;
    return quote.toFixed(2);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div>
      <h1>Wall Quote Calculator</h1>
      <form>
        <label>
          Length of Wall (meters):
          <input type="number" value={length} onChange={handleLengthChange} />
        </label>
        <br />
        <label>
          Height of Wall (meters):
          <input type="number" value={height} onChange={handleHeightChange} />
        </label>
      </form>
      <div>
        {length && height && (
          <p>
            Quote: $ {calculateQuote()} {/* Display the calculated quote */}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculatorPage;
