
import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Rating from '../components/Rating';
import { Store } from '../Store';
import { getError } from '../utils';



const reducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_QUOTE_REQUEST':
      return { ...state, loading: true };
    case 'SAVE_QUOTE_SUCCESS':
      return { ...state, loading: false };
    case 'SAVE_QUOTE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};


const QuoteCalculatorPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [quote, setQuote] = useState('');
  const [quoteCalculated, setQuoteCalculated] = useState(false);
  
  
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  useEffect(() => {
    const fetchDesignData = async () => {
      try {
        const response = await axios.get(`/api/designs/slug/${slug}`);
        setDesign(response.data);
      } catch (error) {
        console.error('Error fetching design data:', error);
      }
    };
    fetchDesignData();
  }, [slug]);

  const squareMeterPrice = design ? design.price : 0;

  const calculateSquareMeters = () => {
    return (length * height).toFixed(2);
  };




  const calculateQuote = () => {
    const area = length * height;
    const quote = area * squareMeterPrice;
    return quote.toFixed(2);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
    setQuoteCalculated(false);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
    setQuoteCalculated(false);
  };


  const calculateQuoteHandler = async () => {
    if (!length || !height) {
      toast.error('Please enter both Length and Height values.');
      return;
    }

    try {
      const quote = await calculateQuote();
      setQuote(quote);
      setQuoteCalculated(true);

      // Remove existing quote data from local storage
      localStorage.removeItem('quoteItems');

      // Create an object with all the quote data
      const quoteItems = [
        {
          ...design, // Use the spread operator to include all properties
          _id: design._id, // Include the _id field separately
          design: design._id, // Include the _id field for the design
          squareMeters: calculateSquareMeters(), // Include squareMeters field
          quotePrice: quote, // Include quotePrice field
        },
      ];

      // Store the quote items in local storage
      localStorage.setItem('quoteItems', JSON.stringify(quoteItems));
    } catch (error) {
      toast.error('Failed to calculate the quote. Please try again.');
    }
  };

  const saveQuoteHandler = async () => {
    if (!userInfo || !userInfo.token) {
      // Redirect to login or show an error message
      return;
    }
    try {
      dispatch({ type: 'CREATE_QUOTE_REQUEST' });

      // Remove existing quote data from local storage
      localStorage.removeItem('quoteItems');

      // Save the quote data to the backend
      await axios.post(
        '/api/quotes',
        {
          quoteItems: [
            {
              slug: design.slug,
              name: design.name,
              image: design.image,
              price: design.price,
              design: design._id,
            },
          ],
          squareMeters: calculateSquareMeters(),
          quotePrice: quote,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: 'SAVE_QUOTE_SUCCESS' });
      localStorage.removeItem('quoteData');
      navigate('/quotes');
    } catch (err) {
      dispatch({ type: 'SAVE_QUOTE_FAIL' });
      toast.error(getError(err));
    }
  };

  const addToCartHandler = async () => {
    if (!quoteCalculated || design.printToOrder === false) {
      window.alert('Please get a quote first before adding to cart');
      return;
    }
  
    const existingItem = cart.cartItems.find(
      (item) =>
        item._id === design._id &&
        item.squareMeters === calculateSquareMeters() &&
        item.quotePrice === quote
    );
  
    if (existingItem) {
      // Item already exists with the same dimensions, increase quantity by 1
      const newCartItems = cart.cartItems.map((item) =>
        item._id === existingItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      // Dispatch the action to update the quantity of the existing item
      ctxDispatch({ type: 'CART_UPDATE_ITEMS', payload: newCartItems });
    } else {
      // Item with different dimensions, add as a new item with the original design ID
      const itemToAdd = {
        ...design,
        quantity: 1,
        squareMeters: calculateSquareMeters(),
        quotePrice: quote,
      };
  
      // Dispatch the action to add the new item to the cart
      ctxDispatch({ type: 'CART_ADD_ITEM', payload: itemToAdd });
    }
  
    navigate('/cart');
  };
  
  

  
  
  


  return (

    <div>
      <Container className="mt-5">
        <Helmet>
          <title>Quote Calculator - {slug}</title>
        </Helmet>
        <h1 className="text-center mb-4">Wall Quote Calculator</h1>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <Row>
            {design && (
              <Col md={6} sm={12}>
                <Card className="p-5 gap-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="length">
                      <Form.Label>Length of Wall (meters):</Form.Label>
                      <Form.Control
                        type="number"
                        value={length}
                        onChange={handleLengthChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                      <Form.Label>Height of Wall (meters):</Form.Label>
                      <Form.Control
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                      />
                    </Form.Group>
                  </Form>
                  {length && height && (
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        Calculated Square Meters: {calculateSquareMeters()}
                      </span>
                      {quoteCalculated ? (
                        <div className="d-flex gap-2 align-items-center">
                          <div>Quote: ${quote}</div>
                          <Button
                            onClick={addToCartHandler}
                            disabled={!quoteCalculated}
                          >
                            Add to Cart
                          </Button>
                          <Button onClick={saveQuoteHandler}>Save Quote</Button>
                        </div>
                      ) : (
                        <Button className= "m-4"onClick={calculateQuoteHandler}>
                          Calculate Quote
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              </Col>
            )}
            <Col md={6}>
              <Row>
                <Col md={6} style={{ minWidth: '320px' }}>
                  <img
                    className="img-medium mb-2"
                    src={design?.image}
                    alt={design?.name}
                  />
                </Col>
                <Col md={6}>
                  <ListGroup style={{ minWidth: '300px' }}>
                    <ListGroup.Item>
                      {design ? (
                        <>
                          <h1>{design.name}</h1>
                          <div>Price: ${design.price} per square meter</div>
                          <div>Style: {design.style}</div>
                          <div>Description: {design.description}</div>
                          <Rating
                            rating={design.rating}
                            numReviews={design.numReviews}
                          />
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>

  );
};

export default QuoteCalculatorPage;