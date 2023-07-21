import data from "../data";
import { Link } from 'react-router-dom';

function HomePage() {
    return<div><h1>Featured Designs</h1>
          <div className="designs">
            {data.designs.map((design) => (
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
          </div></div>
}

export default HomePage;
