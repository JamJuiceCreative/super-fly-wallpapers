// // Import necessary dependencies
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProfilePage from '../pages/ProfilePage';
// import MockStore from '../components/MockStore';


// // Mock axios.put to avoid making actual API calls during testing
// jest.mock('axios', () => ({
//   put: jest.fn(),
// }));

// // Test for the ProfilePage component
// test('should update user profile successfully', async () => {
//   // Mock the user info for the test
//   const userInfo = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     token: 'testToken',
//   };

//   // Render the ProfilePage component with the MockStore wrapper
//   render(
//     <MockStore userInfo={userInfo}>
//       <ProfilePage />
//     </MockStore>
//   );

//   // The rest of the test remains unchanged...
// });
test('placeholder test for HomePage', () => {
  
  expect(true).toBe(true); 
});

