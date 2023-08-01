import { useEffect, useState, useReducer } from 'react';
// import data from '../data';

import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Design from '../components/Design';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, designs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  
  const [{ loading, error, designs }, dispatch] = useReducer(reducer, {
    designs: [],
    loading: true,
    error: '',
  });
  // const [designs, setDesigns] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/designs');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setDesigns(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="m-5">
      <Helmet>
        <title>Superfly Wallpapers</title>
      </Helmet>
      <h1 className="mb-5">Featured Designs</h1>
      <div className="designs">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {designs.map((design) => (
              <Col key={design.slug} sm={6} md={4} lg={3} className="mb-3">
                <Design design={design}></Design>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomePage;
