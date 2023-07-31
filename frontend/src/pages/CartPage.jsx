import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import axios from 'axios';

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    console.log('Updating cart item:', item, 'with quantity:', quantity);
    console.log('Item ID:', item._id);
    const { data } = await axios.get(`/api/designs/${item._id}`);
    if (data.printToOrder === false) {
      window.alert('Sorry. Design is currently not available for print');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity, price: item.quotePrice },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/"> Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/design/$item.slug} `}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: '120px', whiteSpace: 'nowrap' }}
                      >QTY
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                           <i className="fas fa-minus-circle"></i>
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div style={{ whiteSpace: 'nowrap' }}>
                        x {'   '}
                        {item.squareMeters} m<sup>2</sup>
                      </div>
                    </Col>
                    <Col md={2}>${item.quotePrice*item.quantity}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce(
                      (a, c) =>
                        a +
                        (isNaN(c.quotePrice) ? 0 : c.quotePrice) * c.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
