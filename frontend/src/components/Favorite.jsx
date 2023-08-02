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

  
// correctly can send a string to the backend
  // const handleSendDataClick = async () => {
  //   const designData = JSON.parse(localStorage.getItem('designInfo'));
  //   console.log('Design Data:', designData);
  //   console.log('User Data:', userInfo);
  
  //   const dataToSend = "Monkey Magic"; // This is the data you want to send
  
  //   const userId = userInfo._id;
  
  //   axios.post(`/api/favorites/${userId}`, { favorite: dataToSend })
  //     .then(response => {
  //       console.log(response.data.message); // Log the response message
  //     })
  //     .catch(error => {
  //       console.error('Error:', error.message);
  //     });
  // };
  const handleSendDataClick = async () => {
    const designData = JSON.parse(localStorage.getItem('designInfo'));
    console.log('Design Data:', designData);
    console.log('User Data:', userInfo);
  
    // Get the design ID (assuming it's stored in the _id property of designData)
    const designId = designData._id;
  
    const userId = userInfo._id;
  
    axios.post(`/api/favorites/${userId}`, { favorite: designId })
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
