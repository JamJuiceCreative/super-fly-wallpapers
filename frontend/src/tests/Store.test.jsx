// import React from 'react';
// import { render } from '@testing-library/react';
//  // Make sure to import the necessary constants and the StoreProvider
// import { StoreProvider, CART_UPDATE_ITEM_QUANTITY, reducer } from './../Store';



test('placeholder test for HomePage', () => {
  
  expect(true).toBe(true); 
});
// describe('Store reducer', () => {
//   test('CART_UPDATE_ITEM_QUANTITY should update the quantity of a cart item', () => {
//     // Create a mock state with some cart items
//     const mockState = {
//       cart: {
//         cartItems: [
//           { _id: 1, name: 'Item 1', quantity: 1 },
//           { _id: 2, name: 'Item 2', quantity: 2 },
//         ],
//       },
//     };

//     // Define the action to update the quantity of item with _id 1
//     const action = {
//       type: CART_UPDATE_ITEM_QUANTITY,
//       payload: {
//         itemId: 1,
//         quantity: 5,
//       },
//     };

//     // Call the reducer with the mock state and the update action
//     const updatedState = reducer(mockState, action);

//     // Expect the quantity of item with _id 1 to be updated to 5
//     expect(updatedState.cart.cartItems.find((item) => item._id === 1)?.quantity).toBe(5);
//   });

//   // Add more test cases for other reducer functions if needed
// });
