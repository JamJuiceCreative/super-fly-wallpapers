import React from 'react';
import { useStore } from './path/to/your/context/provider'; // Import the custom context provider
import axios from 'axios';
import { toast } from 'react-hot-toast';
import HeartFull from '../assets/heart-full.svg';
import HeartEmpty from '../assets/heart-empty.svg';
import { Store } from '../Store';

const Favorite = ({ design }) => {
  const { state, dispatch } = Store();

  const toggleFavoriteHandler = async (design) => {
    try {
      if (!state.user || !state.user.userInfo) {
        console.log("User information is not available");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };

      const endpoint = `/api/favorites/${state.user.userInfo._id}/${design._id}`;
      const { data } = await axios.post(endpoint, null, config);

      // You might want to update the user information in the state with the new favorites here
      // Dispatch an action to update the user information in the context provider if needed

      toast.success(data.favorite ? 'Design Favorited!' : 'Design removed from favorites!');
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(getError(error));
    }
  };

  return (
    <img
      className="heart-icon"
      src={design.favorite ? HeartFull : HeartEmpty}
      alt={design.favorite ? 'Favorited' : 'Not favorited'}
      onClick={() => toggleFavoriteHandler(design)}
    />
  );
};

export default Favorite;
