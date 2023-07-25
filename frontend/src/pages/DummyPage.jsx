import React from 'react';

const DummyPage = () => {
  const addNumbers = (a, b) => {
    return a + b;
  };

  return (
    <div>
      <h1>Dummy Page</h1>
      <p>1 + 1 = {addNumbers(1, 1)}</p>
    </div>
  );
};

export default DummyPage;
