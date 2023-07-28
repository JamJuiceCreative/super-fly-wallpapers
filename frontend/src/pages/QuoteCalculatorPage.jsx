// QuoteCalculatorPage.jsx
import React, { useState } from 'react';
import { Form, Container, Card } from 'react-bootstrap';

const QuoteCalculatorPage = () => {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const squareMeterPrice = 15; // Replace this with the actual price from your object model

  const calculateSquareMeters = () => {
    return (length * height).toFixed(2);
  };

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
    <Container className="mt-5">
      <h1 className="text-center mb-4">Wall Quote Calculator</h1>
      <Card className="p-4">
        <Form>
          <Form.Group className="mb-3" controlId="length">
            <Form.Label>Length of Wall (meters):</Form.Label>
            <Form.Control type="number" value={length} onChange={handleLengthChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Height of Wall (meters):</Form.Label>
            <Form.Control type="number" value={height} onChange={handleHeightChange} />
          </Form.Group>
        </Form>
        {length && height && (
          <div>
            <p>Calculated Square Meters: {calculateSquareMeters()}</p>
            <p>Quote: $ {calculateQuote()}</p>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default QuoteCalculatorPage;
