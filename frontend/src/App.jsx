import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignPage from './pages/DesignPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        <Navbar bg="white" variant="dark">
      <Container className="d-flex justify-content-center h-120">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/SuperFlyWallPapersLogo.svg"
              className="w-75 ml-10"
              alt="superfly wallpapers logo"
            />
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
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
