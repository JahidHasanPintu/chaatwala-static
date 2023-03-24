import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/admin/Dashboard';
import { About } from './components/frontend/About';
import { Blog } from './components/frontend/Blog';
import { Contact } from './components/frontend/Contact';
import { Food } from './components/frontend/Food';
import { FutureWork } from './components/frontend/FutureWork';
import { Home } from './components/frontend/Home';
import { Login } from './components/frontend/Login';
import { Menu } from './components/frontend/Menu';
import { NotFound } from './components/frontend/NotFound';
import { Order } from './components/frontend/Order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logout } from './components/frontend/Logout';
import FoodDetails from './components/frontend/FoodDetails/FoodDetails';
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
          <Route path="/food-details/:foodID" element={<FoodDetails/>}/>
          <Route path="/food-details/" element={<FoodDetails/>}/>

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/blog-details/:blogID" element={<BlogDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/order" element={ <Order /> } /> */}
          {/* <Route path="/login" element={ <Login /> } />
          <Route path="/logout" element={ <Logout /> } /> */}
          <Route path="/info" element={ <FutureWork /> } />
          {/* <Route path="/profile" element={ <Dashboard /> } /> */}
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
