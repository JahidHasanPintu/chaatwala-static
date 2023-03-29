import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './components/frontend/About';
import { Blog } from './components/frontend/Blog';
import { Contact } from './components/frontend/Contact';
import { Food } from './components/frontend/Food';
import { Home } from './components/frontend/Home';
import { Menu } from './components/frontend/Menu';
import { NotFound } from './components/frontend/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetails from './components/frontend/BlogDetails/BlogDetails';


function App() {
  
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food" element={<Food />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/blog-details/:blogID" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
