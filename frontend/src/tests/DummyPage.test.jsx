import React from 'react';
import { render, screen } from '@testing-library/react';
import DummyPage from '../pages/DummyPage';

test('addNumbers function returns 2', () => {
  render(<DummyPage />);
  const result = screen.getByText('1 + 1 = 2');
  expect(result).toBeInTheDocument();
});
