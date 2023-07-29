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
  const { state } = useContext(Store);
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

      // Create an object with all the quote data
      const quoteData = {
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
      };

      // Store the quote data in local storage
      localStorage.setItem('quoteData', JSON.stringify(quoteData));
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

      const { data } = await axios.post(
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
      localStorage.removeItem('quoteItems');
      navigate('/quotes');
    } catch (err) {
      dispatch({ type: 'SAVE_QUOTE_FAIL' });
      toast.error(getError(err));
    }
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
                    <div>
                      <span>
                        Calculated Square Meters: {calculateSquareMeters()}
                      </span>
                      {quoteCalculated ? (
                        <div>
                          <div>Quote: ${quote}</div>
                          <Button>Add to Cart</Button>
                          <Button onClick={saveQuoteHandler}>Save Quote</Button>
                        </div>
                      ) : (
                        <Button onClick={calculateQuoteHandler}>
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
                <Col md={6}>
                  <img
                    className="img-medium"
                    src={design?.image}
                    alt={design?.name}
                  />
                </Col>
                <Col md={6}>
                  <ListGroup>
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
