import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './router'
import Navigation from './components/navigation';
import Footer from './components/footer';

function App() {
  return (
      <Router>
        <Navigation />
        <Routes />
        {/* <Footer /> */}
      </Router>
  );
}

export default App;
