import { useEffect, useState, useReducer } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Featured Designs</h1>
      <div className="designs">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          designs.map((design) => (
            <div className="design" key={design.slug}>
              <Link to={`/design/${design.slug}`}>
                <img src={design.image} alt={design.name} />
              </Link>
              <div className="design-info">
                <Link to={`/design/${design.slug}`}>
                  <p>{design.name} </p>
                </Link>
                <p>
                  <strong>From ${design.price} </strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default HomePage;
