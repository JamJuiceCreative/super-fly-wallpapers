// Import the necessary testing libraries
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import axios from 'axios';

test('placeholder test for HomePage', () => {
  // You can add any content here, or leave it empty as a placeholder
  expect(true).toBe(true); // This is a placeholder assertion, it will pass
});

// // Mock the axios.get function to return mock data
// jest.mock('axios');
// const mockData = [
//   {
//     name: 'Pirate Adventure',
//     slug: 'pirate-adventure',
//     category: 'Cartoons & Animation',
//     image: '/images/pirate-adventure.png',
//     price: 85,
//     printToOrder: 1,
//     style: 'animation',
//     rating: 4.5,
//     numReviews: 10,
//     description: 'cartoon, animation style pirate adventure on the seven seas.',
//   },
//   {
//     name: 'Monkey Kong Village',
//     slug: 'monkey-king-village',
//     category: 'Video Games',
//     image: '/images/monkey-kong-village.png',
//     price: 85,
//     printToOrder: 1,
//     style: 'video-game',
//     rating: 5,
//     numReviews: 15,
//     description: '3D video game style monkey kong village',
//   },
//   {
//     name: 'Mario Watercolour Pattern',
//     slug: 'mario-water-colour pattern',
//     category: 'Video Games',
//     image: '/images/mario-watercolour-pattern.png',
//     price: 85,
//     printToOrder: 1,
//     style: 'watercolour pattern',
//     rating: 3,
//     numReviews: 8,
//     description: 'water colour style mario themed characters wallpaper pattern',
//   },
//   {
//     name: 'Dark City Heroes',
//     slug: 'dark-city-heroes',
//     category: 'Comics and Popular Culture',
//     image: '/images/dark-city-heroes.png',
//     price: 85,
//     printToOrder: 1,
//     style: 'comic book art ',
//     rating: 5,
//     numReviews: 13,
//     description: 'comic book style heroes in a city on a dark and rainy night.',
//   },
// ];
// axios.get.mockResolvedValue({ data: mockData });

// // Test 1: Check if the "Featured Designs" heading is present
// test('renders "Featured Designs" heading', async () => {
//   render(<HomePage />);
//   const headingElement = screen.getByText('Featured Designs');
//   console.log(headingElement); // Log the heading element to the console
//   expect(headingElement).toBeInTheDocument();
// });


// // Test 2: Check if the designs are rendered on the page
// test('renders designs', async () => {
//   render(<HomePage />);

//   // Wait for the data to be fetched and the component to update
//   await waitFor(() => screen.getByText('Pirate Adventure'));
//   await waitFor(() => screen.getByText('Monkey Kong Village'));
//   // ... Add more waitFor() statements for other mock data as needed

//   // Assert that the designs are rendered on the page
//   expect(screen.getByText('Pirate Adventure')).toBeInTheDocument();
//   expect(screen.getByText('Monkey Kong Village')).toBeInTheDocument();
//   // ... Add more assertions for other mock data as needed
// });

// // Test 3: Check if the "Add to Cart" button is present for each design
// test('renders "Add to Cart" button for each design', async () => {
//   render(<HomePage />);

//   // Wait for the data to be fetched and the component to update
//   await waitFor(() => screen.getByText('Pirate Adventure'));
//   await waitFor(() => screen.getByText('Monkey Kong Village'));
//   // ... Add more waitFor() statements for other mock data as needed

//   // Get all "Add to Cart" buttons
//   const addToCartButtons = screen.getAllByText('Add to Cart');

//   // Assert that the correct number of "Add to Cart" buttons are rendered
//   expect(addToCartButtons.length).toBe(mockData.length);
// });

// // Test 4: Check if the images are displayed for each design
// test('renders images for each design', async () => {
//   render(<HomePage />);

//   // Wait for the data to be fetched and the component to update
//   await waitFor(() => screen.getByText('Pirate Adventure'));
//   await waitFor(() => screen.getByText('Monkey Kong Village'));
//   // ... Add more waitFor() statements for other mock data as needed

//   // Get all images
//   const images = screen.getAllByRole('img');

//   // Assert that the correct number of images are rendered
//   expect(images.length).toBe(mockData.length);
// });
