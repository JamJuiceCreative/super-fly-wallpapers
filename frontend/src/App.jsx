import React from 'react';
import data from './data';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex justify-center items-center h-120 w-screen">
          <a href="/">
            <img
              src="/images/SuperFlyWallPapersLogo.svg"
              className="w-3/4 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto"alt="superfly wallpapers logo"
            />
          </a>
        </div>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="designs">
          {data.designs.map((design) => (
            <div className="design" key={design.slug}>
              <a href={`/design/${design.slug}`}>
                <img src={design.image} alt={design.name} />
              </a>
              <div className="product-info">
                <p>{design.name} </p>
                <p>{design.price} </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
