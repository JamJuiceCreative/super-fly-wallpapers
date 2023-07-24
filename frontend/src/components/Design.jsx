import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

function Design(props) {
  const { design } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === design._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/designs/${item._id}`);
    if (data.printToOrder === 0) {
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
          <Card.Title className="design-title ">{design.name} </Card.Title>
        </Link>
        <Rating rating={design.rating} numReviews={design.numReviews} />
        <Card.Text>
          <strong>From ${design.price} </strong>
        </Card.Text>
        {design.printToOrder === 0 ? (
          <Button variant="light" disabled>
            Not Available
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(design)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Design;
