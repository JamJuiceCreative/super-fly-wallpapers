import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, quotes: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function QuoteListPage() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, quotes }, quoteDispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      quoteDispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/quotes', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        quoteDispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        quoteDispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchQuotes();
  }, [userInfo]);

  const logQuotesData = () => {
    console.log('Quotes Data:', quotes);
  };
  const addToCartHandler = async (quote) => {
    console.log('Quote Data:', quote);

    // Fetch the correct design information from quoteItems
    const design = quote.quoteItems[0].design;

    // Create the new quote object with the correct design _id and quantity
    const newQuote = {
      _id: design._id,
      name: design.name,
      slug: design.slug,
      category: design.category,
      createdAt: design.createdAt,
      description: design.description,
      image: design.image,
      numReviews: design.numReviews,
      price: design.price,
      printToOrder: design.printToOrder,
      rating: design.rating,
      reviews: design.reviews,
      squareMeters: quote.squareMeters,
      quotePrice: quote.quotePrice,
      updatedAt: design.updatedAt,
      __v: design.__v,
      quantity: 1, // Default quantity of 1
    };

    // Dispatch the action to add the quote to the cart
    dispatch({ type: 'CART_ADD_QUOTE', payload: newQuote });

    // Navigate to the cart page
    navigate('/cart');
  };

  const deleteQuoteHandler = async (quote) => {
    console.log('Quote ID to be deleted:', quote._id);
    if (window.confirm('Are you sure to delete this quote?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/quotes/${quote._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Quote deleted successfully');
        window.location.reload();
        // You might want to perform additional actions here after successful deletion
      } catch (error) {
        dispatch({ type: 'DELETE_FAIL' });
        toast.error('Failed to delete quote');
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Quote List</title>
      </Helmet>

      <h1>Quote List</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>DESIGN</th>
              <th>SQUARE METERS</th>
              <th>QUOTE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote._id}>
                <td>{quote._id}</td>
                <td>{quote.createdAt.substring(0, 10)}</td>

                <td>{quote.quoteItems[0].design.name}</td>
                <td>{quote.squareMeters.toFixed(2)}</td>
                <td>{quote.quotePrice.toFixed(2)}</td>
                <td>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => addToCartHandler(quote)}
                  >
                    Add to Cart
                  </Button>
                  &nbsp; &nbsp;
                  <Button onClick={() => deleteQuoteHandler(quote)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
