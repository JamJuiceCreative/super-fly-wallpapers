import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'user1',
      email: 'user1@email.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  designs: [
    {
      // _id: '1',
      name: 'Pirate Adventure',
      slug: 'pirate-adventure',
      category: 'Cartoons and Animation',
      image: '/images/pirate-adventure.png',
      price: 85,
      printToOrder: true,
      style: 'computer generated',
      rating: 0,
      numReviews: 0,
      description:
        'cartoon, animation style pirate adventure on the seven seas.',
    },
    {
      // _id: '2',
      name: 'Monkey Kong Village',
      slug: 'monkey-kong-village',
      category: 'Video Games',
      image: '/images/monkey-kong-village.png',
      price: 85,
      printToOrder: false,
      style: 'computer generated',
      rating: 0,
      numReviews: 0,
      description: '3D video game style monkey kong village',
    },
    {
      // _id: '3',
      name: 'Mario Watercolour Pattern',
      slug: 'mario-water-colour pattern',
      category: 'Video Games',
      image: '/images/mario-watercolour-pattern.png',
      price: 85,
      printToOrder: true,
      style: 'water colour',
      rating: 0,
      numReviews: 0,
      description:
        'water colour style mario themed characters wallpaper pattern',
    },
    {
      // _id: '4',
      name: 'Dark City Heroes',
      slug: 'dark-city-heroes',
      category: 'Comics and Popular Culture',
      image: '/images/dark-city-heroes.png',
      price: 85,
      printToOrder: true,
      style: 'comic book art ',
      rating: 0,
      numReviews: 0,
      description:
        'comic book style heroes in a city on a dark and rainy night.',
    },
  ],
};

export default data;
