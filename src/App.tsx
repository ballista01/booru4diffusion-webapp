import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import ProductScreen from './screens/ImageScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}>
            </Route>
            {/* <Route path="/image/:imageID" component={ImageScreen} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;