import { useContext, useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import HeartFull from '../assets/heart-full.svg';
import HeartEmpty from '../assets/heart-empty.svg';


const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};


function Design(props) {
  const { design } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  const [quoteCalculated, setQuoteCalculated] = useState(false);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  
  
  const initialState = {
    favorites: [], // Initial state for favorites
  };
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialState
  );
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userInfo.token) {
          return; // Do not proceed if token is not available yet
        }
  
        const response = await axios.get(`/api/favorites/${userInfo._id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const userData = response.data;
        favoritesDispatch({ type: 'SET_FAVORITES', payload: userData.favorites });
        console.log('Favorites array on mount:', userData.favorites); // Add this line
      } catch (error) {
        console.error('Error fetching user favorites:', error.message);
      }
    };
  
    fetchFavorites();
  }, [userInfo]);
  

  const toggleFavoriteHandler = async (design) => {
    console.log('User Data:', userInfo);
    console.log('Design Data:', design);

    try {
      await axios.post(`/api/favorites/${userInfo._id}`, {
        favorite: design._id,
      });
      console.log('Design added to favorites');
    } catch (error) {
      console.error('Error adding design to favorites:', error.message);
    }
  };



  const removeFavorite = async (design) => {
    console.log('User Data:', userInfo);
    console.log('Design Data:', design);

    try {
      await axios.delete(`/api/favorites/remove/${userInfo._id}`, {
        data: { favorite: design._id },
      });
      console.log('Design removed from favorites');
      setIsFavorited(false); // Update the state to show heart-empty after removing from favorites
    } catch (error) {
      console.error('Error removing design from favorites:', error.message);
    }
  };


  const showFavoritesHandler = async () => {
    console.log('User Data:', userInfo);
    console.log('Design Data:', design);
    try {
      const response = await axios.get(`/api/favorites/${userInfo._id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const userData = response.data;
      console.log('Favorites array in user document:', userData.favorites);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === design._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/designs/${item._id}`);
    if (!quoteCalculated) {
      // Show a message or alert to inform the user to get a quote first
      window.alert('Please calculate the quote first before adding to cart.');
      return;
    }
    if (data.printToOrder === false) {
      window.alert('Sorry. Design is currently not available for print');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/design/${design.slug}`}>
        <img src={design.image} className="card-img-top" alt={design.name} />
      </Link>
      <Card.Body>
        <Link to={`/design/${design.slug}`}>
          <Card.Title className="design-title ">{design.name}</Card.Title>
        </Link>
        <Rating rating={design.rating} numReviews={design.numReviews} />
        <Card.Text>
          <strong>From ${design.price} </strong>
        </Card.Text>
        <div className="quote-btn-container d-flex justify-content-between">
          {design.printToOrder === false ? (
            <Button variant="light" disabled>
              Not Available
            </Button>
          ) : quoteCalculated ? (
            <Button onClick={() => addToCartHandler(design)}>
              Add to cart
            </Button>
          ) : (
            <Link to={`/quote-calculator/${design.slug}`}>
              {' '}
              {/* Redirect to the quote calculator page */}
              <Button>Get a Quote</Button>
            </Link>
          )}{' '}
           {!favorites.includes(design._id) && (
          <img
            className="heart-icon"
            src={HeartEmpty}
            alt="Not favorited"
            onClick={() => toggleFavoriteHandler(design)}
          />
          )}
        {favorites.includes(design._id) && (
          <img
            className="heart-icon"
            src={HeartFull}
            alt={'Favorited'}
            onClick={() => removeFavourite(design)}
          />
        )}
        </div>
        <button onClick={showFavoritesHandler}>Show Favorites</button>
      </Card.Body>
    </Card>
  );
}

export default Design;
