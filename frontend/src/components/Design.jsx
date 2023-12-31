import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import HeartFull from '../assets/heart-full.svg';
import HeartEmpty from '../assets/heart-empty.svg';

function Design(props) {
  const { design } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialIsFavorited = localStorage.getItem(`favorite_design_${design._id}`);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited === 'true');

  const [quoteCalculated, setQuoteCalculated] = useState(false);





  const toggleFavoriteHandler = () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };

  useEffect(() => {
    // Save the favorited status to the local storage whenever it changes
    localStorage.setItem(`favorite_design_${design._id}`, isFavorited);
  }, [design._id, isFavorited]);


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
    <Card className="overflow-hidden">
      <Link to={`/design/${design.slug}`}>
        <img src={design.image} className="card-img-top" alt={design.name} />
      </Link>
      <Card.Body>
        <Link to={`/design/${design.slug}`}>
          <Card.Title className="design-title ">{design.name}</Card.Title>
        </Link>
        <div className="text-nowrap overflow-hidden">
          <Rating rating={design.rating} numReviews={design.numReviews} />
        </div>
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
          <img
            className="heart-icon"
            src={isFavorited ? HeartFull : HeartEmpty}
            alt={isFavorited ? 'Favorited' : 'Not favorited'}
            onClick={() => toggleFavoriteHandler(design)} // Capture the 'design' object and pass it to the handler
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Design;
