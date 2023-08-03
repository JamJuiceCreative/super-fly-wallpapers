// mockStore.js
import React from 'react';
import { Store } from './Store'; // Import the original Store component

// Create a custom Store component that wraps the original Store component
// and provides the mocked context value.
const MockStore = ({ children, userInfo }) => {
  // Create a mock state object with userInfo
  const mockState = {
    userInfo,
    // You can add other properties to the state if needed for testing other components
  };

  return (
    <Store value={{ state: mockState, dispatch: jest.fn() }}>{children}</Store>
  );
};

export default MockStore;
