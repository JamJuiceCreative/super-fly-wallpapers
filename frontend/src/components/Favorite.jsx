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

  const sendToBackend = (designData) => {
    // Make a POST request to your backend API to add the design data to the user's favorites
    // Replace '/api/favorites/:userId' with the actual API endpoint to add favorites
    axios
      .post(`/api/favorites/${userInfo._id}`, designData)
      .then((response) => {
        // Handle success if needed
        console.log('Design data sent to backend successfully:', response.data);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error sending design data to backend:', error);
      });
  };

  const handleSendDataClick = () => {
    const designData = JSON.parse(localStorage.getItem('designInfo'));
    console.log('Design Data:', designData);

    // Call the sendToBackend function to send the design data to the backend API
    sendToBackend(designData);
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
