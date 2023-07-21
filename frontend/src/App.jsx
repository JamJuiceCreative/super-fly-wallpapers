import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignPage from './pages/DesignPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="flex justify-center items-center h-120 w-screen">
            <a href="/">
              <img
                src="/images/SuperFlyWallPapersLogo.svg"
                className="w-3/4 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto"
                alt="superfly wallpapers logo"
              />
            </a>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/design/:slug" element={<DesignPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
