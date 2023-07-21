import { useEffect, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/designs');
      setDesigns(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Designs</h1>
      <div className="designs">
        {designs.map((design) => (
          <div className="design" key={design.slug}>
            <Link to={`/design/${design.slug}`}>
              <img src={design.image} alt={design.name} />
            </Link>
            <div className="product-info">
              <Link to={`/design/${design.slug}`}>
                <p>{design.name} </p>
              </Link>
              <p>
                <strong>From ${design.price} </strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
