import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import axios from 'axios';

export default function Favorites() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleUserDataClick = () => {
    if (!userInfo) {
      console.log('User information is not available');
      return;
    }

    console.log('User Data:', userInfo);
  };

  const handleDesignDataClick = () => {
    const designData = JSON.parse(localStorage.getItem('designInfo'));
    console.log('Design Data:', designData);
  };

  const handleSendDataClick = () => {
    const designData = JSON.parse(localStorage.getItem('designInfo'));
  
    // Check if user info is available
    if (!userInfo) {
      console.log('User information is not available');
      return;
    }
  
    // Check if design data is available
    if (!designData) {
      console.log('Design data is not available');
      return;
    }
  
    // Check if all the required fields are present in the design data
    const requiredFields = ['name', 'slug', 'image', 'style', 'category', 'description', 'price', 'printToOrder', 'rating', 'numReviews', 'reviews'];
    const presentFields = requiredFields.filter(field => field in designData);
  
    console.log('Present fields in the design data:', presentFields);
  
    // Get the user ID
    const userId = userInfo._id;
  
    // Log the User Data and Design Data (Optional)
    console.log('User Data:', userInfo);
    console.log('Design Data:', designData);
  
    // Make the POST request to the backend
    axios.post(`/api/favorites/${userId}`, { favorite: designData })
      .then(response => {
        console.log(response.data.message); // Log the response message
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };
  
  

  return (
    <div className="m-5">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <h1 className="mb-5">Favorites Page</h1>
      <Button onClick={handleUserDataClick}>User Data</Button>
      <span className="mr-2"></span>
      <Button onClick={handleDesignDataClick}>Design Data</Button>
      <span className="mr-2"></span>
      <Button onClick={handleSendDataClick}>Send Data</Button>
    </div>
  );
}
