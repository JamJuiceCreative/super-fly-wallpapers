// Import necessary dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '../pages/ProfilePage';
import MockStore from '../MockStore';


// Mock axios.put to avoid making actual API calls during testing
jest.mock('axios', () => ({
  put: jest.fn(),
}));

// Test for the ProfilePage component
test('should render user profile and display user info', () => {
  // Mock the user info for the test
  const userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    token: 'testToken',
  };

  // Render the ProfilePage component with the MockStore wrapper
  render(
    <MockStore userInfo={userInfo}>
      <ProfilePage />
    </MockStore>
  );

  // Check if the user profile heading is rendered
  const headingElement = screen.getByText('User Profile');
  expect(headingElement).toBeInTheDocument();

  // Check if the user info fields are displayed with correct values
  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  expect(nameInput.value).toBe(userInfo.name);
  expect(emailInput.value).toBe(userInfo.email);
});
